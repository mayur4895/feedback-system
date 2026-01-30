'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Feedback {
  _id: string;
  title: string;
  message: string;
  category: string;
  rating: number;
  status: string;
  studentName?: string;
  studentEmail?: string;
  adminNotes?: string;
  createdAt: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
  isAdmin?: boolean;
  onSelectFeedback?: (feedback: Feedback) => void;
  selectedId?: string;
}

export default function FeedbackList({
  feedbacks,
  isAdmin = false,
  onSelectFeedback,
  selectedId,
}: FeedbackListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      teaching: 'bg-purple-100 text-purple-800',
      curriculum: 'bg-pink-100 text-pink-800',
      facilities: 'bg-cyan-100 text-cyan-800',
      'campus-life': 'bg-orange-100 text-orange-800',
      administration: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (feedbacks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No feedback found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <Card
          key={feedback._id}
          className={`cursor-pointer transition-all ${
            selectedId === feedback._id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onSelectFeedback?.(feedback)}
        >
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{feedback.title}</h3>
                  {isAdmin && (
                    <p className="text-sm text-gray-600 mt-1">
                      From: {feedback.studentName} ({feedback.studentEmail})
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(feedback.status)}>
                    {feedback.status}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-700 text-sm line-clamp-2">
                {feedback.message}
              </p>

              <div className="flex flex-wrap gap-2 items-center">
                <Badge className={getCategoryColor(feedback.category)}>
                  {feedback.category}
                </Badge>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  {feedback.rating}
                  <span className="text-yellow-500">★</span>
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </span>
              </div>

              {feedback.adminNotes && isAdmin && (
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <p className="font-medium text-blue-900">Admin Notes:</p>
                  <p className="text-blue-800 mt-1">{feedback.adminNotes}</p>
                </div>
              )}

              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeedback?.(feedback);
                  }}
                >
                  Review & Respond
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
