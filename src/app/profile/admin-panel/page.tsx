import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useSession } from 'next-auth/react';
import { Button } from '@/components';

const AdminListings = () => {
  const { data: session } = useSession();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const querySnapshot = await getDocs(collection(db, 'listings'));
      const listingsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((listing) => listing.status === 'not verified');
      setListings(listingsData);
    };

    fetchListings();
  }, []);

  const handleVerify = async (id: string) => {
    const listingDoc = doc(db, 'listings', id);
    await updateDoc(listingDoc, {
      status: 'verified',
    });

    setListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== id),
    );
  };

  if (!session || session.user.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Listings</h1>
      {listings.length === 0 ? (
        <p>No listings to verify</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              {listing.title} - {listing.status}
              <Button onClick={() => handleVerify(listing.id)}>Verify</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminListings;
