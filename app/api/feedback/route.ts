import { connectDB } from '@/lib/mongodb';
import { Feedback, User } from '@/lib/models';
import { verifyAuth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { category, rating, title, message } = await request.json();

    const user = await User.findById(auth.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const feedback = await Feedback.create({
      studentId: auth.userId,
      studentName: user.name,
      studentEmail: user.email,
      category,
      rating,
      title,
      message,
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[v0] Database connected');

    if (auth.role === 'admin') {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 });
      return NextResponse.json(feedbacks);
    } else {
      const feedbacks = await Feedback.find({ studentId: auth.userId }).sort({ createdAt: -1 });
      return NextResponse.json(feedbacks);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch feedback', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
