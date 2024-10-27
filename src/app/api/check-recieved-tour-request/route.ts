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
    const userTourRequestsIds =
      userData?.receivedTourRequests?.tourRequestId || []; // Ожидаем массив
    const recievedTourRequests = [];

    // Проверяем, что userTourRequestsIds это массив
    if (Array.isArray(userTourRequestsIds) && userTourRequestsIds.length > 0) {
      for (const tourRequestId of userTourRequestsIds) {
        const tourRequestDocRef = doc(db, 'tourRequests', tourRequestId);
        const tourRequestDoc = await getDoc(tourRequestDocRef);

        if (tourRequestDoc.exists()) {
          const listingData = tourRequestDoc.data();
          recievedTourRequests.push({ id: tourRequestDoc.id, ...listingData });
        }
      }
    }

    return NextResponse.json({ recievedTourRequests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
