'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

/* ======================================================================
   Neumorphism tokens (same as the home and register pages — consider
   moving these into a shared file such as lib/neu.ts)
   ====================================================================== */

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

const neuBtn = `border-0 ${raisedSm} text-slate-700 transition duration-200 hover:bg-transparent hover:text-violet-700 active:shadow-[inset_4px_4px_8px_#c3c9d8,inset_-4px_-4px_8px_#ffffff] ${focusRing}`;

const neuInput = `h-12 rounded-2xl border-0 px-4 text-slate-700 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:border-transparent ${inset}`;

const labelClass = 'mb-2 block text-sm font-semibold text-slate-700';

/* ======================================================================
   Page
   ====================================================================== */

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Cursor-following glow (exposes --mx / --my on the root element)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const paint = () => {
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);
    };

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      paint();
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (reduceMotion) {
        x = targetX;
        y = targetY;
        paint();
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    paint();
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef1f8] via-[#e6eaf3] to-[#dde3f0] p-4 text-slate-700"
    >
      <style>{`
        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -40px) scale(1.15); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-70px, 50px) scale(0.95); }
        }
        @keyframes shimmer {
          from { background-position: 0% 50%; }
          to { background-position: 100% 50%; }
        }
      `}</style>

      {/* ---------- Interactive pastel background ---------- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-violet-300/30 blur-3xl animate-[drift-a_18s_ease-in-out_infinite] motion-reduce:animate-none" />
        <div className="absolute -right-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-pink-300/25 blur-3xl animate-[drift-b_22s_ease-in-out_infinite] motion-reduce:animate-none" />
        <div className="absolute -bottom-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-sky-300/30 blur-3xl animate-[drift-a_26s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />
        <div className="absolute inset-0 bg-[radial-gradient(650px_circle_at_var(--mx)_var(--my),rgba(139,92,246,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(220px_circle_at_var(--mx)_var(--my),rgba(236,72,153,0.10),transparent_70%)]" />
      </div>

      {/* Back button */}
      <div className="absolute left-4 top-4 z-20">
        <Button
          type="button"
          variant="outline"
          className={`cursor-pointer ${neuBtn}`}
          onClick={() => router.push('/')}
        >
          ← Back to Home
        </Button>
      </div>

      {/* Login card */}
      <Card
        className={`relative z-10 my-16 w-full max-w-md rounded-3xl border-0 py-8 text-slate-700 ${raised}`}
      >
        <CardHeader className="items-center px-6 sm:px-10">
          <span
            className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full text-2xl ${inset}`}
          >
            🎓
          </span>
          <CardTitle className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-[length:200%_auto] bg-clip-text pb-1 text-center text-3xl font-bold text-transparent animate-[shimmer_6s_ease-in-out_infinite_alternate] motion-reduce:animate-none">
            Login
          </CardTitle>
          <p className="mt-1 text-center text-sm text-slate-600">College Feedback System</p>
        </CardHeader>

        <CardContent className="px-6 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert className={`rounded-2xl border-0 ${insetSm}`}>
                <AlertDescription className="font-medium text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={neuInput}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`pr-20 ${neuInput}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 transition duration-200 hover:text-violet-700 active:shadow-[inset_2px_2px_4px_#c3c9d8,inset_-2px_-2px_4px_#ffffff] ${raisedSm} ${focusRing}`}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className={`w-full ${primaryBtn}`} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            No account?{' '}
            <Link
              href="/register"
              className={`rounded font-semibold text-violet-700 hover:underline ${focusRing}`}
            >
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}