import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  FileDown,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Laptop,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                Portify <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">B.Tech</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">4 Templates</a>
            <a href="#ai" className="hover:text-white transition-colors">AI Engine</a>
            <Link href="/p/aarav-sharma" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
              <span>Sample Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 overflow-hidden">
        {/* Glow gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium shadow-inner">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Built Specifically for B.Tech Engineers & Fresh Graduates</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Build a High-Impact Developer Portfolio in{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              2 Minutes
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Turn your college coursework, CGPA, GitHub repositories, and hackathon wins into a recruiter-ready engineering portfolio with AI-written summaries, scannable QR codes, and downloadable PDF resumes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Build Your Portfolio Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/p/aarav-sharma"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-5 h-5 text-indigo-400" />
              <span>Explore Live Demo</span>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>4 Professional Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>AI STAR-Method Project Enhancer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Scannable QR & Print-Ready PDF</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Coding Required</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-3 sm:p-5 shadow-2xl shadow-indigo-500/10">
          <div className="rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden">
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">portify.dev/p/aarav-sharma</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  Modern Developer Template
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-6 bg-slate-950 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-2">
                    B.Tech CSE • Delhi Technological University • CGPA: 9.18
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Aarav Sharma
                  </h3>
                  <p className="text-slate-300 text-sm mt-1 max-w-xl">
                    Final Year B.Tech CSE | Full Stack Developer | Distributed Systems & Cloud
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Student Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Sample cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono text-slate-400">Featured Project</div>
                  <div className="text-sm font-bold text-white mt-1">DevPulse Telemetry</div>
                  <div className="text-[11px] text-slate-400 mt-1">Next.js, WebSockets, Redis pub/sub</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono text-slate-400">Internship</div>
                  <div className="text-sm font-bold text-white mt-1">Software Engineer Intern</div>
                  <div className="text-[11px] text-slate-400 mt-1">HyperGro Tech • May 2025 – Aug 2025</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono text-slate-400">Key Honor</div>
                  <div className="text-sm font-bold text-white mt-1">Smart India Hackathon 2025</div>
                  <div className="text-[11px] text-slate-400 mt-1">1st Runner-Up (1,200+ Teams)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 TEMPLATES SHOWCASE */}
      <section id="templates" className="py-20 px-4 sm:px-8 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Pick Your Signature Aesthetic
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Four Tailored Portfolio Templates
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Every template is mobile-responsive, customizable with your favorite accent color, supports light/dark themes, and generates print-ready PDF resumes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Modern Developer */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-lg">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Modern Developer
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Terminal-inspired commands, interactive tech badges, GitHub project cards, and code aesthetic beloved by tech startups.
                </p>
                <div className="pt-2 flex flex-wrap gap-1 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800">GitHub Cards</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">LeetCode</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">B.Tech CGPA</span>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-800 mt-4">
                <Link
                  href="/register"
                  className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Choose Template <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. Minimal Professional */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all flex flex-col justify-between group shadow-lg">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-mono">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-slate-300 transition-colors">
                  Minimal Professional
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clean editorial typography, airy whitespace, and subtle lines tailored for quick recruiter scanning.
                </p>
                <div className="pt-2 flex flex-wrap gap-1 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800">Editorial</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">Distraction-Free</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">High Conversion</span>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-800 mt-4">
                <Link
                  href="/register"
                  className="text-xs font-semibold text-slate-300 hover:underline flex items-center gap-1"
                >
                  Choose Template <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. Creative Developer */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 transition-all flex flex-col justify-between group shadow-lg">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-mono">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                  Creative Developer
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vibrant gradients, glowing glass cards, interactive pills, and expressive layout for standout frontend engineers.
                </p>
                <div className="pt-2 flex flex-wrap gap-1 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800">Gradients</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">Glow Effects</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">Visual Impact</span>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-800 mt-4">
                <Link
                  href="/register"
                  className="text-xs font-semibold text-pink-400 hover:underline flex items-center gap-1"
                >
                  Choose Template <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 4. Corporate Professional */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group shadow-lg">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  Corporate Professional
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Structured executive slate/navy layout tailored for campus placement drives, MNC interviews, and consulting firms.
                </p>
                <div className="pt-2 flex flex-wrap gap-1 text-[11px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800">MNC Ready</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">Campus Drives</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800">Executive</span>
                </div>
              </div>
              <div className="pt-5 border-t border-slate-800 mt-4">
                <Link
                  href="/register"
                  className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
                >
                  Choose Template <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI ENGINE SECTION */}
      <section id="ai" className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Intelligence Built In
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              AI That Writes Like an Elite Tech Lead
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              No generic fluff or fake claims. Our AI transforms only your actual coursework, technologies, and projects into professional, high-impact statements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-white">AI Headline Generator</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates 3 punchy, targeted headlines combining your B.Tech branch, core languages, and desired engineering role without buzzword clichés.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-white">AI About Me Synthesizer</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates 3 tailored tones: &ldquo;Technical & Impact-Driven&rdquo;, &ldquo;Creative Innovator&rdquo;, and &ldquo;Concise Recruiter-First&rdquo; based strictly on your education and skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-white">STAR Project Enhancer</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transforms rough project notes into structured Situation-Task-Action-Result bullet points highlighting your architecture and technical stack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-4 sm:px-8 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-indigo-950/40">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to Impress Recruiters?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Join hundreds of B.Tech students using Portify to stand out in campus placement drives, off-campus applications, and internship interviews.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition-all"
            >
              <span>Create Your Portfolio Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 sm:px-8 border-t border-slate-800/80 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-300 font-bold">Portify</span>
            <span>— The Student Portfolio Builder</span>
          </div>
          <p>© {new Date().getFullYear()} Portify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
