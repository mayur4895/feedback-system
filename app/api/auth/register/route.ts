import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models';
import { createToken, setAuthCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({
      email,
      password,
      name,
      role: role || 'student',
    });

    const token = await createToken(user._id.toString(), user.email, user.role);
    
    const response = NextResponse.json(
      {
        message: 'User registered successfully',
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
      },
      { status: 201 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
    }
    return NextResponse.json(
      { error: 'Registration failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
