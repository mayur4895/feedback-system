import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models';
import { createToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('[register] step 1: connecting DB');
    await connectDB();
    console.log('[register] step 2: DB connected');

    const body = await request.json();
    console.log('[register] step 3: body =', body);
    const { email, password, name, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    console.log('[register] step 4: User model =', typeof User, User?.modelName);

    const existingUser = await User.findOne({ email });
    console.log('[register] step 5: existingUser =', existingUser);

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
      role: role || 'STUDENT',
    });
    console.log('[register] step 6: user created =', user._id);

    const token = await createToken(user._id.toString(), user.email, user.role);
    console.log('[register] step 7: token created');

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
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
  console.error('=== REGISTER ERROR ===');
  console.error(error);
  if (error instanceof Error) {
    console.error('name:', error.name);
    console.error('message:', error.message);
    console.error('stack:', error.stack);
  }
  return NextResponse.json(
    {
      error: 'Registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    },
    { status: 500 }
  );
}
}