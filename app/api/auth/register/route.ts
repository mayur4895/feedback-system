import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models';
import { createToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/* ======================================================================
   STRICT EMAIL VALIDATION
   - Total length ≤ 254 (RFC 5321)
   - Local part ≤ 64 chars
   - Local part: alphanumeric + . _ % + - ; must start & end alphanumeric
   - No consecutive dots anywhere
   - Domain labels: alphanumeric + hyphen, ≤ 63 chars, no leading/trailing hyphen
   - TLD: at least 2 alphabetic chars (rejects a@gmail.c, a@gmail.c0m)
   ====================================================================== */

const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

const BLOCKED_DOMAINS = new Set([
  'example.com',
  'test.com',
  'invalid.com',
  'localhost',
]);

function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;

  const trimmed = email.trim();
  if (trimmed.length === 0) return false;
  if (!EMAIL_REGEX.test(trimmed)) return false;

  const [localPart, domain] = trimmed.toLowerCase().split('@');
  if (!domain) return false;

  // Blocked throwaway / placeholder domains
  if (BLOCKED_DOMAINS.has(domain)) return false;

  // Domain must contain a dot (regex already enforces — belt & braces)
  if (!domain.includes('.')) return false;

  // TLD must be purely alphabetic, ≥ 2 chars
  const tld = domain.split('.').pop() ?? '';
  if (!/^[A-Za-z]{2,}$/.test(tld)) return false;

  // Local part must not be empty after split
  if (!localPart) return false;

  return true;
}

export async function POST(request: NextRequest) {
  try {
    console.log('[register] step 1: connecting DB');
    await connectDB();
    console.log('[register] step 2: DB connected');

    const body = await request.json();
    console.log('[register] step 3: body =', body);

    const { email, password, name, role } = body ?? {};

    // ---------- required fields ----------
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // ---------- strict type check ----------
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof name !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Invalid input types' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // ---------- strict email validation ----------
    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // ---------- name validation ----------
    if (trimmedName.length < 2 || trimmedName.length > 80) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 80 characters' },
        { status: 400 }
      );
    }

    // ---------- password validation ----------
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }
    if (password.length > 128) {
      return NextResponse.json(
        { error: 'Password is too long' },
        { status: 400 }
      );
    }

    // ---------- role whitelist ----------
    const allowedRoles = ['STUDENT', 'ADMIN'];
    const finalRole =
      typeof role === 'string' && allowedRoles.includes(role.toUpperCase())
        ? role.toUpperCase()
        : 'STUDENT';

    console.log('[register] step 4: User model =', typeof User, User?.modelName);

    // ---------- duplicate check (on normalized email) ----------
    const existingUser = await User.findOne({ email: normalizedEmail });
    console.log('[register] step 5: existingUser =', existingUser);

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // ---------- create ----------
    const user = await User.create({
      email: normalizedEmail,
      password,
      name: trimmedName,
      role: finalRole,
    });
    console.log('[register] step 6: user created =', user._id);

    const token = await createToken(user._id.toString(), user.email, user.role);
    console.log('[register] step 7: token created');

    const response = NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
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
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}