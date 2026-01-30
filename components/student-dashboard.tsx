'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FeedbackList from './feedback-list';

interface Feedback {
  _id: string;
  title: string;
  message: string;
  category: string;
  rating: number;
  status: string;
  createdAt: string;
  adminNotes?: string;
}

export default function StudentDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    category: 'teaching',
    rating: '5',
    title: '',
    message: '',
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback',  { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setFeedbacks(data);
      }
    } catch (err) {
      console.error('Failed to fetch feedback');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      setFormData({ category: 'teaching', rating: '5', title: '', message: '' });
      setSubmitted(true);
      setShowForm(false);
      fetchFeedbacks();

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {submitted && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            ✓ Your feedback has been submitted successfully!
          </AlertDescription>
        </Alert>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">Your Feedback Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{feedbacks.length}</p>
                <p className="text-gray-600 text-sm mt-2">Total Submitted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">
                  {feedbacks.filter((f) => f.status === 'pending').length}
                </p>
                <p className="text-gray-600 text-sm mt-2">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {feedbacks.filter((f) => f.status === 'resolved').length}
                </p>
                <p className="text-gray-600 text-sm mt-2">Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className="w-full md:w-auto">
          + Submit New Feedback
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Feedback</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Share your thoughts and suggestions to help us improve the college experience
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teaching">Teaching Quality</SelectItem>
                    <SelectItem value="curriculum">Curriculum</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                    <SelectItem value="campus-life">Campus Life</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5)
                </label>
                <Select
                  value={formData.rating}
                  onValueChange={(value) =>
                    setFormData({ ...formData, rating: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Fair</SelectItem>
                    <SelectItem value="3">3 - Good</SelectItem>
                    <SelectItem value="4">4 - Very Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Brief title of your feedback"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Detailed feedback..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">Your Feedback History</h2>
        <FeedbackList feedbacks={feedbacks} isAdmin={false} />
      </div>
    </div>
  );
}
