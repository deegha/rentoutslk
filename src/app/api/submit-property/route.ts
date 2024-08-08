import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Handle the combined form data here
    console.log('Received data:', data);

    // You can add your database or other logic here

    return NextResponse.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

// export const runtime = 'nodejs'; // Add this line to specify the runtime if needed
