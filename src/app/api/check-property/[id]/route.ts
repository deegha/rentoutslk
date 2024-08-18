import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { message: 'Property not found' },
        { status: 404 },
      );
    }

    const property = docSnap.data();
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error('Error fetching property data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
