import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') || '';
    const place = searchParams.get('place') || '';

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
        place: doc.data().place,
        image1: doc.data().image1,
        image2: doc.data().image2,
        image3: doc.data().image3,
        image4: doc.data().image4,
        image5: doc.data().image5,
        image6: doc.data().image6,
        image7: doc.data().image7,
        image8: doc.data().image8,
        image9: doc.data().image9,
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
        active: doc.data().active,
      }))
      .filter((listing) => {
        const matchesAddress = listing.address
          .toLowerCase()
          .includes(address.toLowerCase());
        const matchesPlace = listing.place
          .toLowerCase()
          .includes(place.toLowerCase());
        return (matchesAddress || matchesPlace) && listing.active === true;
      })
      .sort((a, b) => b.views - a.views); // Сортируем по количеству просмотров

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error('Error fetching trending listings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch trending listings' },
      { status: 500 },
    );
  }
}
