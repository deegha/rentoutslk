import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { verifyIdToken } from '@/firebase/firebaseAdmin';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await verifyIdToken(token);
    const userUid = decodedToken.uid;

    const q = query(collection(db, 'users'), where('uid', '==', userUid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const userListingIds = userData?.listings || [];
    const listings = [];

    for (const listingId of userListingIds) {
      const listingDocRef = doc(db, 'listings', listingId);
      const listingDoc = await getDoc(listingDocRef);

      if (listingDoc.exists()) {
        const listingData = listingDoc.data();
        if (listingData.status === 'verified') {
          listings.push({ id: listingDoc.id, ...listingData });
        }
      }
    }

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
