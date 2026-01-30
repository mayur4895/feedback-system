'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FeedbackList from './feedback-list';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Feedback {
  _id: string;
  title: string;
  message: string;
  category: string;
  rating: number;
  status: string;
  studentName: string;
  studentEmail: string;
  adminNotes?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback');
      if (res.ok) {
        const data = await res.json();
        setFeedbacks(data);
      }
    } catch (err) {
      console.error('Failed to fetch feedback');
    }
  };

  const handleUpdateFeedback = async () => {
    if (!selectedFeedback) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/feedback/${selectedFeedback._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (res.ok) {
        setUpdated(true);
        setTimeout(() => setUpdated(false), 3000);
        fetchFeedbacks();
        setSelectedFeedback(null);
        setAdminNotes('');
        setStatus('pending');
      }
    } catch (err) {
      console.error('Failed to update feedback');
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedbacks =
    filter === 'all'
      ? feedbacks
      : feedbacks.filter((f) => f.status === filter);

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter((f) => f.status === 'pending').length,
    reviewed: feedbacks.filter((f) => f.status === 'reviewed').length,
    resolved: feedbacks.filter((f) => f.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {updated && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            ✓ Feedback updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-gray-600 text-sm mt-2">Total Feedback</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-gray-600 text-sm mt-2">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">{stats.reviewed}</p>
              <p className="text-gray-600 text-sm mt-2">Reviewed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
              <p className="text-gray-600 text-sm mt-2">Resolved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Feedback</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FeedbackList
            feedbacks={filteredFeedbacks}
            isAdmin={true}
            onSelectFeedback={(feedback) => {
              setSelectedFeedback(feedback);
              setStatus(feedback.status);
              setAdminNotes(feedback.adminNotes || '');
            }}
            selectedId={selectedFeedback?._id}
          />
        </div>

        <div>
          {selectedFeedback ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Review Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    From
                  </p>
                  <p className="font-medium">{selectedFeedback.studentName}</p>
                  <p className="text-sm text-gray-600">
                    {selectedFeedback.studentEmail}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Title
                  </p>
                  <p className="font-medium">{selectedFeedback.title}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Message
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedFeedback.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Category
                    </p>
                    <p>{selectedFeedback.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Rating
                    </p>
                    <p className="flex items-center gap-1">
                      {selectedFeedback.rating}
                      <span className="text-yellow-500">★</span>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add your notes..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleUpdateFeedback}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Updating...' : 'Update Feedback'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 text-sm">
                  Select feedback to review
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
