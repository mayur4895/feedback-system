<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>College Feedback System · Professional</title>
  <!-- Tailwind CDN (no extra packages) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- subtle custom styles for interactive hover & transitions -->
  <style>
    /* smooth card lift & border glow */
    .card-hover {
      transition: transform 0.2s ease, box-shadow 0.3s ease, border-color 0.2s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
      border-color: #94a3b8;
    }
    /* glassy background overlay for hero */
    .hero-glow {
      background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08), transparent 50%),
                  radial-gradient(circle at 90% 70%, rgba(16, 185, 129, 0.06), transparent 45%);
    }
    /* smooth button lift */
    .btn-lift {
      transition: all 0.15s ease;
    }
    .btn-lift:active {
      transform: scale(0.97);
    }
    /* interactive star decoration */
    .star-pulse {
      animation: softPulse 3s infinite;
    }
    @keyframes softPulse {
      0%, 100% { opacity: 0.15; }
      50% { opacity: 0.3; }
    }
  </style>
</head>
<body class="antialiased">
  <!-- entire page with professional gradient (slate + subtle blue) -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/80 hero-glow">
    
    <!-- Header — sticky with subtle transparency & shadow on hover -->
    <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm shadow-sm border-b border-slate-200/60 transition-shadow hover:shadow-md">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-wrap justify-between items-center gap-4">
        <div class="flex items-center gap-2">
          <!-- subtle icon mark (pure css / text) -->
          <div class="w-2 h-8 bg-blue-600 rounded-full"></div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-800">
            College<span class="text-blue-600">Feedback</span>
          </h1>
        </div>
        <div class="flex gap-3">
          <a href="/login" class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all">
            Login
          </a>
          <a href="/register" class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all btn-lift">
            Register
          </a>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      
      <!-- Hero Section — more refined & interactive -->
      <div class="relative text-center mb-16 max-w-3xl mx-auto">
        <!-- decorative star-like subtle circles -->
        <div class="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200/20 blur-3xl star-pulse"></div>
        <div class="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-emerald-200/20 blur-3xl star-pulse" style="animation-delay: 0.8s;"></div>
        
        <span class="inline-block text-sm font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-4 border border-blue-200/60 shadow-sm">
          Student voices matter
        </span>
        <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight leading-[1.15]">
          Share Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Feedback</span>
        </h2>
        <p class="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Help us improve college life by sharing your honest feedback on teaching, facilities, campus life, and more.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="/register" class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all btn-lift">
            Get Started →
          </a>
          <a href="#features" class="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm hover:bg-white hover:border-slate-400 transition-all">
            Learn more
          </a>
        </div>
      </div>

      <!-- Features — interactive cards with hover lift & icons -->
      <div id="features" class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
        <!-- card 1 -->
        <div class="card-hover bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-800 mb-2">Easy Feedback Form</h3>
          <p class="text-slate-600 leading-relaxed">Simple and quick submission with categories and ratings to help us understand your experience.</p>
        </div>
        <!-- card 2 -->
        <div class="card-hover bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col">
          <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 border border-indigo-100">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-800 mb-2">Track Status</h3>
          <p class="text-slate-600 leading-relaxed">Monitor your feedback submissions and see the status as it gets reviewed and resolved.</p>
        </div>
        <!-- card 3 -->
        <div class="card-hover bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 border border-emerald-100">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-800 mb-2">Admin Reviews</h3>
          <p class="text-slate-600 leading-relaxed">Our admin team reviews all feedback and provides notes to ensure your concerns are addressed.</p>
        </div>
      </div>

      <!-- Roles Section — enhanced with interactive accents and hover -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-4">
        <!-- student card -->
        <div class="card-hover bg-white rounded-2xl border-l-4 border-l-blue-500 shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-7 flex flex-col">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">S</div>
            <h3 class="text-2xl font-bold text-slate-800">Student Role</h3>
          </div>
          <ul class="space-y-3 mb-7">
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-blue-600 font-bold mt-0.5">✓</span> Submit feedback on various college aspects
            </li>
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-blue-600 font-bold mt-0.5">✓</span> Rate your experience (1–5 stars)
            </li>
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-blue-600 font-bold mt-0.5">✓</span> Track feedback status
            </li>
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-blue-600 font-bold mt-0.5">✓</span> View admin responses and notes
            </li>
          </ul>
          <a href="/register" class="inline-flex items-center justify-center rounded-xl border-2 border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all mt-auto w-fit">
            Register as Student →
          </a>
        </div>
        <!-- admin card -->
        <div class="card-hover bg-white rounded-2xl border-l-4 border-l-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-7 flex flex-col">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">A</div>
            <h3 class="text-2xl font-bold text-slate-800">Admin Role</h3>
          </div>
          <ul class="space-y-3 mb-7">
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-emerald-600 font-bold mt-0.5">✓</span> Review all student feedback
            </li>
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-emerald-600 font-bold mt-0.5">✓</span> Update feedback status (pending/reviewed/resolved)
            </li>
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-emerald-600 font-bold mt-0.5">✓</span> Add admin notes and responses
            </li>
            <li class="flex items-start gap-3 text-slate-700">
              <span class="text-emerald-600 font-bold mt-0.5">✓</span> View feedback analytics and statistics
            </li>
          </ul>
          <a href="/register" class="inline-flex items-center justify-center rounded-xl border-2 border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all mt-auto w-fit">
            Register as Admin →
          </a>
        </div>
      </div>

      <!-- subtle interactive callout (extra engagement) -->
      <div class="mt-14 text-center text-slate-500 text-sm border-t border-slate-200/70 pt-8 flex flex-wrap justify-center gap-6">
        <span class="flex items-center gap-1.5">⭐ 4.8 average satisfaction</span>
        <span class="flex items-center gap-1.5">📋 2.4k+ feedback submitted</span>
        <span class="flex items-center gap-1.5">⚡ 98% resolution rate</span>
      </div>
    </main>

    <!-- Footer — slightly refined -->
    <footer class="bg-slate-900 text-slate-300 mt-16 border-t border-slate-700/50">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p class="text-slate-400">College Feedback System © 2026. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-white transition-colors">Privacy</a>
          <a href="#" class="hover:text-white transition-colors">Terms</a>
          <a href="#" class="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>

  <!-- tiny interactive behavior: smooth scroll for anchor (optional, no package) -->
  <script>
    (function() {
      // just a small interactive touch: prevent default for hash links and smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === "#" || href === "") return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    })();
  </script>
</body>
</html>
