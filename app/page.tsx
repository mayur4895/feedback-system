'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* ======================================================================
   Neumorphism tokens
   Soft UI = one base colour + a light shadow (top-left) and a dark shadow
   (bottom-right). "raised" pushes out, "inset" presses in.
   ====================================================================== */

const raised =
  'bg-gradient-to-br from-[#eef2f9] to-[#dde3f0] shadow-[9px_9px_18px_#c3c9d8,-9px_-9px_18px_#ffffff]';
const raisedSm =
  'bg-gradient-to-br from-[#eef2f9] to-[#dde3f0] shadow-[5px_5px_10px_#c3c9d8,-5px_-5px_10px_#ffffff]';
const raisedXs =
  'bg-gradient-to-br from-[#eef2f9] to-[#dde3f0] shadow-[3px_3px_6px_#c3c9d8,-3px_-3px_6px_#ffffff]';
const inset =
  'bg-[#e3e8f2] shadow-[inset_6px_6px_12px_#c3c9d8,inset_-6px_-6px_12px_#ffffff]';
const insetSm =
  'bg-[#e3e8f2] shadow-[inset_3px_3px_6px_#c3c9d8,inset_-3px_-3px_6px_#ffffff]';

const accentGradient = 'bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e6eaf3]';

const primaryBtn = `border-0 ${accentGradient} text-white shadow-[6px_6px_14px_#c3c9d8,-6px_-6px_14px_#ffffff] transition duration-200 hover:brightness-110 active:scale-95 active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.25)] disabled:opacity-50 disabled:shadow-none ${focusRing}`;

const neuBtn = `border-0 ${raisedSm} text-slate-700 transition duration-200 hover:bg-transparent hover:text-violet-700 active:shadow-[inset_4px_4px_8px_#c3c9d8,inset_-4px_-4px_8px_#ffffff] ${focusRing}`;

/* ======================================================================
   Content  (sample data — replace with real data from your API)
   ====================================================================== */

type Status = 'Pending' | 'Reviewed' | 'Resolved';
const statuses: Status[] = ['Pending', 'Reviewed', 'Resolved'];

const statusStyle: Record<Status, { dot: string; text: string; hex: string }> = {
  Pending: { dot: 'bg-amber-400', text: 'text-amber-700', hex: '#fbbf24' },
  Reviewed: { dot: 'bg-indigo-500', text: 'text-indigo-700', hex: '#6366f1' },
  Resolved: { dot: 'bg-emerald-500', text: 'text-emerald-700', hex: '#10b981' },
};

const stats = [
  { label: 'Feedback submitted', to: 2480, suffix: '+', decimals: 0 },
  { label: 'Resolved', to: 86, suffix: '%', decimals: 0 },
  { label: 'Average response (days)', to: 2.4, suffix: '', decimals: 1 },
  { label: 'Departments covered', to: 12, suffix: '', decimals: 0 },
];

const features = [
  {
    icon: '📝',
    title: 'Easy Feedback Form',
    text: 'Simple and quick feedback submission with categories and ratings to help us understand your experience.',
  },
  {
    icon: '📍',
    title: 'Track Status',
    text: 'Monitor your feedback submissions and see the status of your feedback as it gets reviewed and resolved.',
  },
  {
    icon: '🛡️',
    title: 'Admin Reviews',
    text: 'Our admin team reviews all feedback and provides notes to ensure your concerns are addressed.',
  },
];

const categories = [
  { emoji: '📚', label: 'Teaching', blurb: 'Lectures, labs, course material and faculty support.' },
  { emoji: '🏫', label: 'Facilities', blurb: 'Classrooms, labs, Wi-Fi and general maintenance.' },
  { emoji: '🎭', label: 'Campus Life', blurb: 'Clubs, events, sports and student activities.' },
  { emoji: '📖', label: 'Library', blurb: 'Books, journals, study spaces and opening hours.' },
  { emoji: '🍽️', label: 'Hostel & Canteen', blurb: 'Rooms, food quality, hygiene and services.' },
  { emoji: '🗂️', label: 'Administration', blurb: 'Admissions, fees, documents and office support.' },
];

const steps: { title: string; status: Status; text: string }[] = [
  {
    title: 'Submit',
    status: 'Pending',
    text: 'Pick a category, rate your experience from 1 to 5 stars and describe what happened. New feedback starts as pending.',
  },
  {
    title: 'Review',
    status: 'Reviewed',
    text: 'An admin reads your feedback, marks it as reviewed and adds a note so you know what happens next.',
  },
  {
    title: 'Resolve',
    status: 'Resolved',
    text: 'When the issue has been dealt with, the status changes to resolved and you can read the final admin response.',
  },
];

const sampleFeedback: {
  id: number;
  category: string;
  title: string;
  rating: number;
  status: Status;
  note?: string;
}[] = [
  {
    id: 1,
    category: 'Teaching',
    title: 'More practical sessions needed in the DBMS lab',
    rating: 3,
    status: 'Reviewed',
    note: 'Shared with the department. Extra lab slots are being planned.',
  },
  {
    id: 2,
    category: 'Facilities',
    title: 'Water cooler on the second floor is not working',
    rating: 2,
    status: 'Resolved',
    note: 'Cooler replaced and checked by the maintenance team.',
  },
  {
    id: 3,
    category: 'Library',
    title: 'Please extend library hours during exams',
    rating: 4,
    status: 'Pending',
  },
  {
    id: 4,
    category: 'Campus Life',
    title: 'Clubs need a bigger space for weekend events',
    rating: 4,
    status: 'Pending',
  },
  {
    id: 5,
    category: 'Hostel & Canteen',
    title: 'Canteen cleanliness needs attention',
    rating: 2,
    status: 'Resolved',
    note: 'Weekly hygiene inspection added; results posted on the notice board.',
  },
];

const ratingsByCategory = [
  { label: 'Teaching', value: 4.2 },
  { label: 'Facilities', value: 3.6 },
  { label: 'Campus Life', value: 4.4 },
  { label: 'Library', value: 3.9 },
  { label: 'Hostel & Canteen', value: 3.3 },
];

const roles = [
  {
    icon: '🎓',
    title: 'Student Role',
    cta: 'Register as Student',
    points: [
      'Submit feedback on various college aspects',
      'Rate your experience (1-5 stars)',
      'Track feedback status',
      'View admin responses and notes',
    ],
  },
  {
    icon: '🧑‍💼',
    title: 'Admin Role',
    cta: 'Register as Admin',
    points: [
      'Review all student feedback',
      'Update feedback status (pending/reviewed/resolved)',
      'Add admin notes and responses',
      'View feedback analytics and statistics',
    ],
  },
];

/* ======================================================================
   Small hooks / helpers
   ====================================================================== */

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function CountUp({
  to,
  decimals = 0,
  suffix = '',
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function StatusPill({ status }: { status: Status }) {
  const s = statusStyle[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${insetSm} ${s.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-slate-800 sm:text-3xl">{title}</h3>
      <p className="mt-2 max-w-2xl text-slate-600">{sub}</p>
    </div>
  );
}

/* Card with a soft highlight that follows the cursor */
function NeuCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--cx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--cy', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className="group relative transition duration-300 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(260px_circle_at_var(--cx,50%)_var(--cy,50%),rgba(255,255,255,0.45),transparent_70%)]" />
      <Card className={`h-full rounded-3xl border-0 py-6 text-slate-700 ${raised} ${className}`}>
        {children}
      </Card>
    </div>
  );
}

/* ======================================================================
   Interactive: quick feedback demo (local state only, nothing is saved)
   ====================================================================== */

const ratingWords = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

function PulseCheck() {
  const [category, setCategory] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  const shown = hover || rating;
  const canSend = category !== null && rating > 0;

  const reset = () => {
    setCategory(null);
    setRating(0);
    setHover(0);
    setComment('');
    setSent(false);
  };

  if (sent) {
    return (
      <div className={`rounded-3xl p-8 text-center ${raised}`} aria-live="polite">
        <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${inset}`}>
          ✅
        </div>
        <h3 className="text-xl font-bold text-slate-800">That is all it takes</h3>
        <p className="mx-auto mt-2 max-w-xs text-slate-600">
          This was a preview and nothing was saved. Register to send real feedback and track it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/register">
            <Button className={primaryBtn}>Register</Button>
          </Link>
          <Button variant="outline" onClick={reset} className={neuBtn}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${raised}`}>
      <h3 className="text-xl font-bold text-slate-800">Try it: quick feedback</h3>
      <p className="mt-1 text-sm text-slate-600">Preview only. Nothing is saved.</p>

      <p className="mb-3 mt-6 text-sm font-semibold text-slate-700">What is it about?</p>
      <div className="flex flex-wrap gap-3">
        {categories.map((c) => {
          const active = category === c.label;
          return (
            <button
              key={c.label}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c.label)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${focusRing} ${
                active ? `${insetSm} text-violet-700` : `${raisedXs} text-slate-600 hover:text-slate-900`
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mb-3 mt-6 text-sm font-semibold text-slate-700">How was your experience?</p>
      <div className="flex items-center gap-4">
        <div
          role="radiogroup"
          aria-label="Rating"
          className={`inline-flex gap-1 rounded-2xl px-3 py-1 ${insetSm}`}
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onMouseEnter={() => setHover(n)}
              onClick={() => setRating(n)}
              className={`rounded-lg text-3xl leading-none transition duration-150 hover:scale-125 ${focusRing} ${
                n <= shown ? 'text-amber-400' : 'text-slate-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <span className="text-sm font-medium text-slate-600">
          {shown ? ratingWords[shown - 1] : 'Tap a star'}
        </span>
      </div>

      <label htmlFor="pulse-comment" className="mb-3 mt-6 block text-sm font-semibold text-slate-700">
        Anything to add?
      </label>
      <textarea
        id="pulse-comment"
        rows={3}
        maxLength={200}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us what worked and what did not"
        className={`w-full resize-none rounded-2xl p-4 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 ${inset}`}
      />
      <div className="mt-1 text-right text-xs text-slate-600">{comment.length}/200</div>

      <Button
        disabled={!canSend}
        onClick={() => setSent(true)}
        size="lg"
        className={`mt-4 w-full ${primaryBtn}`}
      >
        Submit feedback
      </Button>
    </div>
  );
}

/* ======================================================================
   Interactive: 3-step process
   ====================================================================== */

function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <div className={`rounded-3xl p-6 sm:p-10 ${raised}`}>
      <div className="relative grid grid-cols-3 gap-2">
        {/* progress track */}
        <div
          className={`absolute left-[16.66%] right-[16.66%] top-8 h-2 -translate-y-1/2 overflow-hidden rounded-full ${insetSm}`}
        >
          <div
            className={`h-full rounded-full ${accentGradient} transition-all duration-500 motion-reduce:transition-none`}
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            aria-current={active === i ? 'step' : undefined}
            className={`relative z-10 flex flex-col items-center gap-3 rounded-2xl py-1 ${focusRing}`}
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold transition duration-300 ${
                i <= active
                  ? `${accentGradient} text-white shadow-[4px_4px_10px_#c3c9d8,-4px_-4px_10px_#ffffff]`
                  : `${raisedSm} text-slate-600`
              }`}
            >
              {i + 1}
            </span>
            <span className="font-semibold text-slate-800">{s.title}</span>
            <StatusPill status={s.status} />
          </button>
        ))}
      </div>

      <div className={`mt-8 rounded-2xl p-5 text-slate-700 ${insetSm}`} aria-live="polite">
        {steps[active].text}
      </div>
    </div>
  );
}

/* ======================================================================
   Interactive: filterable status board
   ====================================================================== */

function StatusBoard() {
  const [filter, setFilter] = useState<'All' | Status>('All');
  const tabs: ('All' | Status)[] = ['All', ...statuses];
  const visible =
    filter === 'All' ? sampleFeedback : sampleFeedback.filter((f) => f.status === filter);

  const countFor = (t: 'All' | Status) =>
    t === 'All' ? sampleFeedback.length : sampleFeedback.filter((f) => f.status === t).length;

  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${raised}`}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h4 className="text-lg font-bold text-slate-800">My feedback</h4>
        <div className={`inline-flex gap-1 rounded-full p-1.5 ${insetSm}`}>
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition duration-200 ${focusRing} ${
                filter === t ? `${raisedXs} text-violet-700` : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t} ({countFor(t)})
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-4">
        {visible.map((f) => (
          <li key={f.id} className={`rounded-2xl p-4 sm:p-5 ${raisedSm}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">{f.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-medium text-violet-700">
                    {f.category}
                  </span>
                  <span
                    className="text-sm tracking-wide text-amber-500"
                    aria-label={`${f.rating} out of 5 stars`}
                  >
                    {'★'.repeat(f.rating)}
                    <span className="text-slate-300">{'★'.repeat(5 - f.rating)}</span>
                  </span>
                </div>
              </div>
              <StatusPill status={f.status} />
            </div>
            {f.note && (
              <p className={`mt-4 rounded-xl p-3 text-sm text-slate-700 ${insetSm}`}>
                <span className="font-semibold text-slate-800">Admin note: </span>
                {f.note}
              </p>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-slate-600">Sample entries shown for preview.</p>
    </div>
  );
}

/* ======================================================================
   Analytics preview: status donut + average rating bars
   ====================================================================== */

function Analytics() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);

  const total = sampleFeedback.length;
  let acc = 0;
  const stops = statuses
    .map((s) => {
      const count = sampleFeedback.filter((f) => f.status === s).length;
      const from = (acc / total) * 100;
      acc += count;
      const to = (acc / total) * 100;
      return `${statusStyle[s].hex} ${from}% ${to}%`;
    })
    .join(', ');

  return (
    <div ref={ref} className={`rounded-3xl p-6 sm:p-8 ${raised}`}>
      <h4 className="mb-6 text-lg font-bold text-slate-800">Admin analytics</h4>

      {/* donut */}
      <div className="flex flex-wrap items-center gap-6">
        <div
          className="relative h-32 w-32 shrink-0 rounded-full shadow-[6px_6px_12px_#c3c9d8,-6px_-6px_12px_#ffffff]"
          style={{ background: `conic-gradient(${stops})` }}
          role="img"
          aria-label="Feedback by status"
        >
          <div
            className={`absolute inset-[20%] flex flex-col items-center justify-center rounded-full ${raisedSm}`}
          >
            <span className="text-2xl font-bold text-slate-800">{total}</span>
            <span className="text-xs text-slate-600">total</span>
          </div>
        </div>
        <ul className="space-y-2">
          {statuses.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
              <span className={`h-3 w-3 rounded-full ${statusStyle[s].dot}`} />
              {s}: {sampleFeedback.filter((f) => f.status === s).length}
            </li>
          ))}
        </ul>
      </div>

      {/* bars */}
      <h5 className="mb-4 mt-8 text-sm font-semibold text-slate-700">Average rating by category</h5>
      <ul className="space-y-4">
        {ratingsByCategory.map((r) => (
          <li key={r.label}>
            <div className="mb-1.5 flex justify-between text-sm text-slate-700">
              <span>{r.label}</span>
              <span className="font-semibold">{r.value.toFixed(1)}</span>
            </div>
            <div className={`h-3 overflow-hidden rounded-full ${insetSm}`}>
              <div
                className={`h-full rounded-full ${accentGradient} transition-[width] duration-1000 ease-out motion-reduce:transition-none`}
                style={{ width: inView ? `${(r.value / 5) * 100}%` : '0%' }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ======================================================================
   Page
   ====================================================================== */

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Smoothly trail the cursor and expose it as --mx / --my for the background glow.
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
      className="relative min-h-screen bg-gradient-to-br from-[#eef1f8] via-[#e6eaf3] to-[#dde3f0] text-slate-700"
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
        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
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

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#e6eaf3]/80 shadow-[0_6px_16px_rgba(195,201,216,0.6)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${inset}`}>
                🎓
              </span>
              <h1 className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                College Feedback System
              </h1>
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <a href="#categories" className={`rounded transition hover:text-violet-700 ${focusRing}`}>
                Categories
              </a>
              <a href="#how-it-works" className={`rounded transition hover:text-violet-700 ${focusRing}`}>
                How it works
              </a>
              <a href="#status" className={`rounded transition hover:text-violet-700 ${focusRing}`}>
                Status board
              </a>
            </nav>

            <div className="flex gap-3">
              <Link href="/login">
                <Button variant="outline" className={neuBtn}>
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className={primaryBtn}>Register</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-24 px-4 py-16 sm:py-24">
          {/* Hero */}
          <section className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2 className="mb-5 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-[length:200%_auto] bg-clip-text pb-2 text-4xl font-bold leading-tight text-transparent animate-[shimmer_6s_ease-in-out_infinite_alternate] motion-reduce:animate-none md:text-6xl">
                Share Your Feedback
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-lg text-slate-600 md:text-xl lg:mx-0">
                Help us improve college life by sharing your honest feedback on teaching, facilities,
                campus life, and more.
              </p>
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link href="/register">
                  <Button size="lg" className={`${primaryBtn} px-8`}>
                    Get Started
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className={`${neuBtn} px-8`}>
                    See how it works
                  </Button>
                </a>
              </div>
            </div>

            <PulseCheck />
          </section>

          {/* Stats */}
          <section aria-label="Feedback statistics">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className={`rounded-3xl p-6 text-center ${raised}`}>
                  <p className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-600">Sample numbers shown for preview.</p>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((f) => (
              <NeuCard key={f.title}>
                <CardHeader>
                  <span className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl ${inset}`}>
                    {f.icon}
                  </span>
                  <CardTitle className="text-lg text-slate-800">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{f.text}</p>
                </CardContent>
              </NeuCard>
            ))}
          </section>

          {/* Categories */}
          <section id="categories" className="scroll-mt-28">
            <SectionTitle
              title="Feedback for every part of college"
              sub="Choose the category that fits, so your feedback reaches the right people."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <Link
                  key={c.label}
                  href="/register"
                  className={`group flex items-start gap-4 rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_24px_#c3c9d8,-12px_-12px_24px_#ffffff] ${raisedSm} ${focusRing}`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl transition duration-300 group-hover:scale-110 ${inset}`}
                  >
                    {c.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-800">{c.label}</span>
                    <span className="mt-1 block text-sm text-slate-600">{c.blurb}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section id="how-it-works" className="scroll-mt-28">
            <SectionTitle
              title="From submission to resolution"
              sub="Select a step to see what happens to your feedback."
            />
            <HowItWorks />
          </section>

          {/* Status board + analytics */}
          <section id="status" className="scroll-mt-28">
            <SectionTitle
              title="See it in action"
              sub="Students follow each submission as it moves along. Admins get the numbers at a glance."
            />
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <StatusBoard />
              </div>
              <div className="lg:col-span-2">
                <Analytics />
              </div>
            </div>
          </section>

          {/* Roles */}
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {roles.map((r) => (
              <NeuCard key={r.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${inset}`}>
                      {r.icon}
                    </span>
                    <CardTitle className="text-xl text-slate-800">{r.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {r.points.map((p) => (
                    <p key={p} className="flex gap-3 text-slate-700">
                      <span className="font-bold text-violet-600">✓</span>
                      {p}
                    </p>
                  ))}
                  <Link href="/register" className="inline-block pt-4">
                    <Button variant="outline" className={neuBtn}>
                      {r.cta}
                    </Button>
                  </Link>
                </CardContent>
              </NeuCard>
            ))}
          </section>

          {/* Closing call to action */}
          <section className={`rounded-3xl px-6 py-14 text-center sm:px-12 ${inset}`}>
            <h3 className="text-2xl font-bold text-slate-800 sm:text-3xl">Ready to be heard?</h3>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Create an account, send your first feedback and follow it until it is resolved.
            </p>
            <Link href="/register" className="mt-8 inline-block">
              <Button size="lg" className={`${primaryBtn} px-10`}>
                Get Started
              </Button>
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/70">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-slate-600">
            <p>College Feedback System © 2026. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}