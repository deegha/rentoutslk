import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  if (!searchQuery) {
    return NextResponse.json({ results: [] });
  }

  try {
    const listingsRef = collection(db, 'listings');
    const allListingsSnapshot = await getDocs(
      query(
        listingsRef,
        where('status', '==', 'verified'),
        where('active', '==', true),
      ),
    );

    const results = allListingsSnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          address: typeof data.address === 'string' ? data.address : '',
          city: typeof data.city === 'string' ? data.city : '',
        };
      })
      .filter(
        (result) =>
          result.address.toLowerCase().includes(searchQuery) ||
          result.city.toLowerCase().includes(searchQuery),
      );

    return NextResponse.json({
      results: Array.from(new Set(results.map((item) => JSON.stringify(item))))
        .slice(0, 1)
        .map((item) => JSON.parse(item)),
    });
  } catch (error) {
    console.error('Error fetching search results:', (error as Error).message);
    return NextResponse.json(
      {
        message: 'Failed to fetch search results',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
