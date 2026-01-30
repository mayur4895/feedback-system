import { clearAuthCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await clearAuthCookie();
  return NextResponse.json({ message: 'Logged out' });
}
