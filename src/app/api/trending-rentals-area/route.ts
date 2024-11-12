import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') || '';
    const city = searchParams.get('city') || '';

    const listingsRef = collection(db, 'listings');
    const querySnapshot = await getDocs(listingsRef);

    const listings = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        address: doc.data().address,
        availableFrom: doc.data().availableFrom,
        deposit: Number(doc.data().deposit),
        floorArea: Number(doc.data().floorArea),
        propertyType: doc.data().propertyType,
        monthlyRent: Number(doc.data().monthlyRent),
        title: doc.data().title,
        city: doc.data().city,
        images: doc.data().images || [],
        numberBedrooms: Number(doc.data().numberBedrooms),
        numberBathrooms: Number(doc.data().numberBathrooms),
        furnishing: doc.data().furnishing,
        createdAt: doc.data().createdAt,
        views: Number(doc.data().views),
        parking: doc.data().parking,
        pool: doc.data().pool,
        hotWater: doc.data().hotWater,
        tv: doc.data().tv,
        gym: doc.data().gym,
        electricCharger: doc.data().electricCharger,
        status: doc.data().status,
      }))
      .filter((listing) => {
        const matchesAddress = listing.address
          .toLowerCase()
          .includes(address.toLowerCase());
        const matchesCity = listing.city
          .toLowerCase()
          .includes(city.toLowerCase());
        return (matchesAddress || matchesCity) && listing.status === 'approved';
      })
      .sort((a, b) => b.views - a.views);

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error('Error fetching trending listings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch trending listings' },
      { status: 500 },
    );
  }
}
