import { connectDB } from '@/lib/mongodb';
import { Feedback } from '@/lib/models';
import { verifyAuth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const auth = await verifyAuth();
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { status, adminNotes } = await request.json();

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      {
        $set: {
          status: status.toLowerCase(),
          adminNotes,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    );
  }
}
