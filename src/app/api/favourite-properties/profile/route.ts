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

    const savedPropertyIds = userData?.savedProperties || [];

    const savedProperties = [];
    for (const propertyId of savedPropertyIds) {
      const propertyDocRef = doc(db, 'listings', propertyId);
      const propertyDoc = await getDoc(propertyDocRef);
      if (propertyDoc.exists()) {
        savedProperties.push({ id: propertyDoc.id, ...propertyDoc.data() });
      }
    }

    return NextResponse.json({ savedProperties }, { status: 200 });
  } catch (error) {
    console.error('Error fetching saved properties:', error);
    return NextResponse.json(
      { message: 'Failed to fetch saved properties' },
      { status: 500 },
    );
  }
}
