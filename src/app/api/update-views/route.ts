import { db } from '@/firebase/config';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { propertyId } = await request.json();

    if (!propertyId) {
      console.error('Missing propertyId');
      return NextResponse.json(
        { message: 'Property ID is required' },
        { status: 400 },
      );
    }

    const propertyDocRef = doc(db, 'listings', propertyId);

    // Обновление просмотров (views)
    await updateDoc(propertyDocRef, {
      views: increment(1),
    });

    return NextResponse.json({ message: 'Views updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating views:', error);
    return NextResponse.json(
      { message: 'Failed to update views' },
      { status: 500 },
    );
  }
}
