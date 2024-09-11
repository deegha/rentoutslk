import { db } from '@/firebase/config';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, action } = await request.json();

    console.log('Received id:', id);
    console.log('Received action:', action);

    if (!id || !action) {
      return NextResponse.json(
        { message: 'Property ID and action are required' },
        { status: 400 },
      );
    }

    const userDocRef = doc(db, 'users', session.user.id as string);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return NextResponse.json(
        { message: 'User document not found' },
        { status: 404 },
      );
    }

    if (action === 'add') {
      await updateDoc(userDocRef, {
        savedProperties: arrayUnion(id),
      });
      return NextResponse.json(
        { message: 'Property added to favorites' },
        { status: 200 },
      );
    } else if (action === 'remove') {
      await updateDoc(userDocRef, {
        savedProperties: arrayRemove(id),
      });
      return NextResponse.json(
        { message: 'Property removed from favorites' },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating favorite properties:', error);
    return NextResponse.json(
      { message: 'Failed to update favorites' },
      { status: 500 },
    );
  }
}
