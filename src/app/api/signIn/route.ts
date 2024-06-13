// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { login } from 'config/firebase/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const user = await login(email, password);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
