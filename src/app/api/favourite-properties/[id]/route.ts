import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const jsonResponse = (message: string, status: number, data?: any) => {
  return NextResponse.json({ message, ...data }, { status });
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return jsonResponse('Unauthorized', 401);
    }

    const { id } = params;
    if (!id || typeof id !== 'string') {
      return jsonResponse('Invalid Property ID', 400);
    }

    const userDocRef = doc(db, 'users', session.user.id as string);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return jsonResponse('User not found', 404);
    }

    const userData = userDoc.data();
    const isFavourite = userData?.savedProperties?.includes(id);

    return jsonResponse('Success', 200, { isFavourite });
  } catch {
    return jsonResponse('Failed to check favourite status', 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return jsonResponse('Unauthorized', 401);
    }

    const { id } = params;
    if (!id || typeof id !== 'string') {
      return jsonResponse('Invalid Property ID', 400);
    }

    const userDocRef = doc(db, 'users', session.user.id as string);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return jsonResponse('User not found', 404);
    }

    await updateDoc(userDocRef, {
      savedProperties: arrayRemove(id),
    });

    return jsonResponse('Property removed from favourites', 200);
  } catch {
    return jsonResponse('Failed to remove favourite property', 500);
  }
}
