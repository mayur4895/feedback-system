'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            College Feedback System
          </h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Your Feedback
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Help us improve college life by sharing your honest feedback on teaching, facilities,
            campus life, and more.
          </p>
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Easy Feedback Form</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Simple and quick feedback submission with categories and ratings to help us understand your experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Track Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor your feedback submissions and see the status of your feedback as it gets reviewed and resolved.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our admin team reviews all feedback and provides notes to ensure your concerns are addressed.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Roles Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle>Student Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                ✓ Submit feedback on various college aspects
              </p>
              <p className="text-gray-700">
                ✓ Rate your experience (1-5 stars)
              </p>
              <p className="text-gray-700">
                ✓ Track feedback status
              </p>
              <p className="text-gray-700">
                ✓ View admin responses and notes
              </p>
              <Link href="/register" className="inline-block mt-4">
                <Button variant="outline">Register as Student</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle>Admin Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                ✓ Review all student feedback
              </p>
              <p className="text-gray-700">
                ✓ Update feedback status (pending/reviewed/resolved)
              </p>
              <p className="text-gray-700">
                ✓ Add admin notes and responses
              </p>
              <p className="text-gray-700">
                ✓ View feedback analytics and statistics
              </p>
              <Link href="/register" className="inline-block mt-4">
                <Button variant="outline">Register as Admin</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p>College Feedback System © 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
