import { NextRequest, NextResponse } from 'next/server';
import { db } from 'config/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json({ error: 'Error checking user' }, { status: 500 });
  }
}
