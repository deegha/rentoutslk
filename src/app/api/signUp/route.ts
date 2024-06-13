import { NextRequest, NextResponse } from 'next/server';
import { register } from 'config/firebase/auth';

export async function POST(req: NextRequest) {
  const { email, password, additionalData } = await req.json();
  try {
    const user = await register(email, password, additionalData);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
