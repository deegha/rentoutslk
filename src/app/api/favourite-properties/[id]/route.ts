import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: 'Property ID is required' },
        { status: 400 },
      );
    }

    const userDocRef = doc(db, 'users', session.user.id as string);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    const isFavourite = userData?.savedProperties?.includes(id);

    return NextResponse.json({ isFavourite }, { status: 200 });
  } catch (error) {
    console.error('Error checking favourite properties:', error);
    return NextResponse.json(
      { message: 'Failed to check favourite status' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: 'Property ID is required' },
        { status: 400 },
      );
    }

    const userDocRef = doc(db, 'users', session.user.id as string);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await updateDoc(userDocRef, {
      savedProperties: arrayRemove(id),
    });

    return NextResponse.json(
      { message: 'Property removed from favourites' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error removing favourite property:', error);
    return NextResponse.json(
      { message: 'Failed to remove favourite property' },
      { status: 500 },
    );
  }
}
