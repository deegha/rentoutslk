import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { propertyId, ownerId, userId, name, email, phone, message } =
      await req.json();

    if (!propertyId || !ownerId || !userId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    console.log('Received data:', {
      propertyId,
      ownerId,
      userId,
      name,
      email,
      phone,
      message,
    });

    const ownerRef = doc(db, 'users', ownerId);
    const ownerDoc = await getDoc(ownerRef);

    if (!ownerDoc.exists()) {
      console.error('Owner not found for ID:', ownerId);
      return NextResponse.json({ message: 'Owner not found' }, { status: 404 });
    }

    console.log('Owner found:', ownerDoc.data());

    const tourRequestRef = await addDoc(collection(db, 'tourRequests'), {
      propertyId,
      ownerId,
      userId,
      name,
      email,
      phone,
      message,
      createdAt: serverTimestamp(),
    });

    const tourRequestId = tourRequestRef.id;

    await updateDoc(ownerRef, {
      receivedTourRequests: arrayUnion({
        tourRequestId,
        propertyId,
        userId,
        name,
        email,
        phone,
        message,
        createdAt: serverTimestamp(),
      }),
    });

    console.log('Owner updated successfully');

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      sentTourRequests: arrayUnion({
        tourRequestId,
        propertyId,
        ownerId,
        message,
        createdAt: serverTimestamp(),
      }),
    });

    console.log('User updated successfully');

    return NextResponse.json(
      { message: 'Tour request sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending tour request:', error);
    return NextResponse.json(
      { message: 'Failed to send tour request' },
      { status: 500 },
    );
  }
}
