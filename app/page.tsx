
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background Decorative Elements */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-[-200px] top-[200px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-200px] left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">

          <Link href="/" className="group flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                College<span className="text-blue-400">Feedback</span>
              </h1>
              <p className="hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:block">
                Student Experience Platform
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              Features
            </Link>

            <Link
              href="#roles"
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              Platform
            </Link>

            <Link
              href="#about"
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button className="bg-blue-600 shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30">
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Register</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28">

          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* Hero Content */}
            <div className="text-center lg:text-left">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-medium text-blue-300">
                <Sparkles className="h-4 w-4" />
                Empowering Student Voices
              </div>

              <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
                Your Feedback.
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Your Impact.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg lg:mx-0">
                Share your honest feedback, help improve campus life,
                and build a better educational experience for everyone.
                Your voice matters.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 px-7 shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 sm:w-auto"
                  >
                    Share Your Feedback
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-slate-700 bg-white/5 px-7 text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    Explore Platform
                  </Button>
                </Link>

              </div>

              {/* Trust Indicators */}
              <div className="mt-9 flex flex-wrap justify-center gap-5 text-xs text-slate-500 lg:justify-start">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Simple & Easy
                </span>

                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Secure Platform
                </span>

                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-400" />
                  Student Focused
                </span>
              </div>

            </div>

            {/* Interactive Dashboard Preview */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">

              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl" />

              <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">

                {/* Preview Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">STUDENT DASHBOARD</p>
                    <h3 className="mt-1 text-lg font-semibold">Feedback Overview</h3>
                  </div>

                  <div className="rounded-xl bg-blue-500/10 p-3">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                  </div>
                </div>

                {/* Preview Stats */}
                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                      <span className="text-xs text-emerald-400">Active</span>
                    </div>
                    <p className="text-3xl font-bold">24</p>
                    <p className="mt-1 text-xs text-slate-500">Total Feedback</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <ClipboardCheck className="h-5 w-5 text-purple-400" />
                      <span className="text-xs text-blue-400">Tracked</span>
                    </div>
                    <p className="text-3xl font-bold">18</p>
                    <p className="mt-1 text-xs text-slate-500">Reviewed</p>
                  </div>

                </div>

                {/* Preview Chart */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5">

                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Feedback Activity</h4>
                    <span className="text-xs text-slate-500">Overview</span>
                  </div>

                  <div className="flex h-36 items-end justify-between gap-3 px-2">

                    {[45, 65, 40, 85, 60, 95, 75].map((height, index) => (
                      <div
                        key={index}
                        className="group flex h-full flex-1 items-end"
                      >
                        <div
                          style={{ height: `${height}%` }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-blue-600/50 to-cyan-400 transition-all duration-500 group-hover:from-purple-600 group-hover:to-pink-400"
                        />
                      </div>
                    ))}

                  </div>

                  <div className="mt-3 flex justify-between text-[10px] text-slate-600">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                </div>

                {/* Preview Feedback */}
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">

                  <div className="rounded-full bg-emerald-400/10 p-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      Feedback Reviewed
                    </p>
                    <p className="text-xs text-slate-500">
                      Your voice helps create change.
                    </p>
                  </div>

                </div>

              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl sm:flex lg:-left-8">

                <div className="rounded-xl bg-emerald-500/10 p-2">
                  <Star className="h-5 w-5 fill-emerald-400 text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Student First</p>
                  <p className="text-xs text-slate-500">Every voice matters</p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Stats Section */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">

            {[
              { value: '100%', label: 'Student Focused' },
              { value: '1–5', label: 'Rating Scale' },
              { value: '24/7', label: 'Feedback Access' },
              { value: '3', label: 'Feedback Statuses' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Platform Features
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>

            <p className="mt-4 text-slate-400">
              A simple and transparent way to share feedback and
              follow the progress of your submissions.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                icon: MessageSquare,
                title: 'Easy Feedback Forms',
                description:
                  'Submit feedback quickly with categories, ratings, and detailed comments.',
                color: 'blue',
              },
              {
                icon: ClipboardCheck,
                title: 'Track Your Feedback',
                description:
                  'Monitor submitted feedback and follow its review and resolution status.',
                color: 'purple',
              },
              {
                icon: BarChart3,
                title: 'Admin Analytics',
                description:
                  'Review feedback trends and manage submissions through an admin dashboard.',
                color: 'emerald',
              },
            ].map((feature) => {

              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="group border-white/10 bg-white/[0.04] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-blue-950/30"
                >

                  <CardHeader>

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>

                    <CardTitle className="text-lg text-white">
                      {feature.title}
                    </CardTitle>

                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </CardContent>

                </Card>
              );
            })}

          </div>

        </section>

        {/* Roles Section */}
        <section id="roles" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
              Built for Everyone
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              One Platform. Two Roles.
            </h2>

            <p className="mt-4 text-slate-400">
              Empower students to share their opinions and
              administrators to take meaningful action.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Student Card */}
            <Card className="group relative overflow-hidden border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-transparent text-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/50">

              <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

              <CardHeader className="relative">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                  <GraduationCap className="h-7 w-7 text-blue-400" />
                </div>

                <CardTitle className="text-2xl text-white">
                  Student Portal
                </CardTitle>

                <p className="pt-2 text-sm text-slate-400">
                  Share your experience and help shape a better campus.
                </p>

              </CardHeader>

              <CardContent className="relative">

                <ul className="space-y-4 text-sm text-slate-300">

                  {[
                    'Submit feedback on college facilities',
                    'Rate your experience from 1–5',
                    'Track feedback status',
                    'View admin responses and notes',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                      {item}
                    </li>
                  ))}

                </ul>

                <Link href="/register" className="mt-8 block">
                  <Button className="w-full bg-blue-600 transition-all hover:bg-blue-500">
                    Register as Student
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

              </CardContent>

            </Card>

            {/* Admin Card */}
            <Card className="group relative overflow-hidden border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-transparent text-white transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/50">

              <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

              <CardHeader className="relative">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <ShieldCheck className="h-7 w-7 text-emerald-400" />
                </div>

                <CardTitle className="text-2xl text-white">
                  Admin Portal
                </CardTitle>

                <p className="pt-2 text-sm text-slate-400">
                  Manage feedback and help improve the student experience.
                </p>

              </CardHeader>

              <CardContent className="relative">

                <ul className="space-y-4 text-sm text-slate-300">

                  {[
                    'Review student feedback',
                    'Update feedback status',
                    'Add notes and responses',
                    'View feedback analytics',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}

                </ul>

                <Link href="/login" className="mt-8 block">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-400/30 bg-emerald-400/5 text-emerald-300 transition-all hover:bg-emerald-400/10 hover:text-emerald-200"
                  >
                    Admin Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

              </CardContent>

            </Card>

          </div>

        </section>

        {/* CTA Section */}
        <section id="about" className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent px-6 py-16 text-center sm:px-12">

            <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">

              <Sparkles className="mx-auto mb-5 h-8 w-8 text-blue-400" />

              <h2 className="text-3xl font-bold sm:text-4xl">
                Your Voice Can Make a Difference
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Start sharing your feedback today and contribute
                to creating a better college experience.
              </p>

              <Link href="/register" className="mt-8 inline-block">
                <Button
                  size="lg"
                  className="bg-blue-600 px-8 shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 hover:bg-blue-500"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:px-6 md:flex-row md:text-left lg:px-8">

          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-400" />
            <p className="text-sm font-semibold text-slate-300">
              College Feedback System
            </p>
          </div>

          <p className="text-xs text-slate-500">
            © 2026 College Feedback System. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}
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
