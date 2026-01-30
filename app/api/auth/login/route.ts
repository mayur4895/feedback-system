import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models';
import { createToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] Login attempt started');
    
    await connectDB();
    console.log('[v0] Database connected');
    
    const body = await request.json();
    console.log('[v0] Login request for:', body.email);
    const { email, password } = body;

    if (!email || !password) {
      console.log('[v0] Login validation failed: missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('[v0] User not found:', email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('[v0] User found, checking password');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[v0] Password mismatch');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('[v0] Password matched, creating token');
    const token = await createToken(user._id.toString(), user.email, user.role);

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
      },
      { status: 200 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('[v0] Login error:', error);
    if (error instanceof Error) {
      console.error('[v0] Error message:', error.message);
      console.error('[v0] Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Login failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
