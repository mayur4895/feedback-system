'use client';

import React from "react"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FeedbackList from './feedback-list';

/* ---------- neumorphism tokens ---------- */
const raised =
  'bg-gradient-to-br from-[#eef2f9] to-[#dde3f0] shadow-[9px_9px_18px_#c3c9d8,-9px_-9px_18px_#ffffff]';
const raisedSm =
  'bg-gradient-to-br from-[#eef2f9] to-[#dde3f0] shadow-[5px_5px_10px_#c3c9d8,-5px_-5px_10px_#ffffff]';
const inset =
  'bg-[#e3e8f2] shadow-[inset_6px_6px_12px_#c3c9d8,inset_-6px_-6px_12px_#ffffff]';
const insetSm =
  'bg-[#e3e8f2] shadow-[inset_3px_3px_6px_#c3c9d8,inset_-3px_-3px_6px_#ffffff]';
const accentGradient = 'bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500';
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e6eaf3]';
const primaryBtn = `border-0 ${accentGradient} text-white shadow-[6px_6px_14px_#c3c9d8,-6px_-6px_14px_#ffffff] transition duration-200 hover:brightness-110 active:scale-95 active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25)] disabled:opacity-50 disabled:shadow-none ${focusRing}`;
const outlineBtn = `border-0 text-slate-700 ${raisedSm} transition duration-200 hover:brightness-105 active:scale-95 active:shadow-[inset_3px_3px_6px_#c3c9d8,inset_-3px_-3px_6px_#ffffff] ${focusRing}`;
const labelClass = 'mb-2 block text-sm font-semibold text-slate-700';
const statCardClass = `rounded-3xl border-0 ${raised}`;
const selectTriggerClass = `w-full rounded-2xl border-0 px-4 text-slate-700 data-[size=default]:h-11 focus-visible:ring-2 focus-visible:ring-violet-400 ${inset}`;
const selectContentClass =
  'rounded-2xl border-0 bg-[#e6eaf3] p-1 text-slate-700 shadow-[9px_9px_18px_#c3c9d8,-9px_-9px_18px_#ffffff]';
const selectItemClass = 'rounded-xl focus:bg-violet-100 focus:text-violet-800';
const inputClass = `w-full rounded-2xl border-0 px-4 text-slate-700 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:border-transparent ${inset} h-11`;
const textareaClass = `resize-none rounded-2xl border-0 px-4 py-3 text-slate-700 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:border-transparent ${inset}`;

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

interface StudentSession {
  studentId: string;
  studentName: string;
  studentEmail: string;
}

/* --------------------------------------------------------------
   Read student from sessionStorage (set at login).
   NO fallback — if missing, we can't fetch this student's data.
   -------------------------------------------------------------- */
function getStudentFromSession(): StudentSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw =
      sessionStorage.getItem('student') ||
      localStorage.getItem('student') ||
      localStorage.getItem('user');

    if (!raw) return null;

    const p = JSON.parse(raw);
    const studentId = String(p.studentId ?? p._id ?? '').trim();

    // Require at least a studentId — otherwise treat as "not logged in"
    if (!studentId) return null;

    return {
      studentId,
      studentName: p.studentName || p.name || '',
      studentEmail: p.studentEmail || p.email || '',
    };
  } catch {
    return null;
  }
}

export default function StudentDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [student, setStudent] = useState<StudentSession | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  const [formData, setFormData] = useState({
    category: 'teaching',
    rating: '5',
    title: '',
    message: '',
  });

  // Load student ONCE from session
  useEffect(() => {
    const s = getStudentFromSession();
    setStudent(s);
    setSessionChecked(true);
  }, []);

  // Fetch whenever we know the student
  useEffect(() => {
    if (student?.studentId) {
      fetchFeedbacks();
    } else {
      setFeedbacks([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student?.studentId]);

  const fetchFeedbacks = async () => {
    if (!student?.studentId) return;

    try {
      const res = await fetch(
        `/api/feedback?studentId=${encodeURIComponent(student.studentId)}`,
        { cache: 'no-store' }
      );

      if (!res.ok) {
        setFeedbacks([]);
        return;
      }

      const data = await res.json();
      // Server already filters by studentId — trust it
      setFeedbacks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch feedback', err);
      setFeedbacks([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating),
          studentId: student.studentId,
          studentName: student.studentName,
          studentEmail: student.studentEmail,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to submit');
      }

      const created = await res.json().catch(() => null);

      // Optimistic prepend so the count updates instantly
      if (created && created._id) {
        setFeedbacks((prev) => [created, ...prev]);
      }

      setFormData({ category: 'teaching', rating: '5', title: '', message: '' });
      setSubmitted(true);
      setShowForm(false);

      // Small delay, then refetch to stay in sync with DB
      setTimeout(() => fetchFeedbacks(), 300);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  // Wait until we've checked the session
  if (!sessionChecked) {
    return (
      <div className="space-y-6">
        <Card className={`rounded-3xl border-0 ${raised}`}>
          <CardContent className="pt-6">
            <p className="text-center text-sm text-slate-500">Loading…</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No student in session → nothing to show
  if (!student) {
    return (
      <div className="space-y-6">
        <Card className={`rounded-3xl border-0 ${raised}`}>
          <CardContent className="pt-6">
            <p className="text-center text-sm text-slate-500">
              Please log in to view and submit feedback.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {submitted && (
        <Alert className={`rounded-2xl border-0 ${insetSm}`}>
          <AlertDescription className="font-medium text-emerald-700">
            ✓ Your feedback has been submitted successfully!
          </AlertDescription>
        </Alert>
      )}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">Your Feedback Summary</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className={statCardClass}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
                  {feedbacks.length}
                </p>
                <p className="mt-2 text-sm text-slate-600">Total Submitted</p>
              </div>
            </CardContent>
          </Card>
          <Card className={statCardClass}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-3xl font-bold text-transparent">
                  {feedbacks.filter((f) => f.status === 'pending').length}
                </p>
                <p className="mt-2 text-sm text-slate-600">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card className={statCardClass}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-3xl font-bold text-transparent">
                  {feedbacks.filter((f) => f.status === 'resolved').length}
                </p>
                <p className="mt-2 text-sm text-slate-600">Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className={`w-full md:w-auto ${primaryBtn}`}>
          + Submit New Feedback
        </Button>
      ) : (
        <Card className={`rounded-3xl border-0 ${raised}`}>
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">Submit Your Feedback</CardTitle>
            <p className="mt-2 text-sm text-slate-600">
              Share your thoughts and suggestions to help us improve the college experience
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className={`rounded-2xl border-0 ${insetSm}`}>
                  <AlertDescription className="font-medium text-red-700">{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <label className={labelClass}>Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className={selectTriggerClass}><SelectValue /></SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="teaching" className={selectItemClass}>Teaching Quality</SelectItem>
                    <SelectItem value="curriculum" className={selectItemClass}>Curriculum</SelectItem>
                    <SelectItem value="facilities" className={selectItemClass}>Facilities</SelectItem>
                    <SelectItem value="campus-life" className={selectItemClass}>Campus Life</SelectItem>
                    <SelectItem value="administration" className={selectItemClass}>Administration</SelectItem>
                    <SelectItem value="other" className={selectItemClass}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className={labelClass}>Rating (1-5)</label>
                <Select
                  value={formData.rating}
                  onValueChange={(value) => setFormData({ ...formData, rating: value })}
                >
                  <SelectTrigger className={selectTriggerClass}><SelectValue /></SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="1" className={selectItemClass}>1 - Poor</SelectItem>
                    <SelectItem value="2" className={selectItemClass}>2 - Fair</SelectItem>
                    <SelectItem value="3" className={selectItemClass}>3 - Good</SelectItem>
                    <SelectItem value="4" className={selectItemClass}>4 - Very Good</SelectItem>
                    <SelectItem value="5" className={selectItemClass}>5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className={labelClass}>Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief title of your feedback"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detailed feedback..."
                  rows={5}
                  required
                  className={textareaClass}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className={primaryBtn}>
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className={outlineBtn}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">Your Feedback History</h2>
        {feedbacks.length === 0 ? (
          <Card className={`rounded-3xl border-0 ${raised}`}>
            <CardContent className="pt-6">
              <p className="text-center text-sm text-slate-500">
                You haven&apos;t submitted any feedback yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <FeedbackList feedbacks={feedbacks} isAdmin={false} />
        )}
      </div>
    </div>
  );
}