import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  ExternalLink,
  FolderGit2,
  Code2,
  Briefcase,
  Award,
  GraduationCap,
  Eye,
  QrCode,
  Download,
} from "lucide-react";
import { calculateCompleteness, TEMPLATES } from "@/lib/utils";
import { PDFDownloadButton } from "@/components/templates/PDFDownloadButton";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const completeness = calculateCompleteness(user);
  const currentTemplate = TEMPLATES.find((t) => t.id === user.template) || TEMPLATES[0];

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portify Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {user.headline || "Final Year B.Tech Student | Ready to build your digital presence"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={`/p/${user.username}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/dashboard/preview"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </Link>
            <PDFDownloadButton studentName={user.name} />
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
            <FolderGit2 className="w-4 h-4 text-pink-400" /> Projects
          </div>
          <div className="text-2xl font-bold text-white">{user.projects?.length || 0}</div>
          <div className="text-[11px] text-slate-500">Documented</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
            <Code2 className="w-4 h-4 text-purple-400" /> Skills
          </div>
          <div className="text-2xl font-bold text-white">{user.skills?.length || 0}</div>
          <div className="text-[11px] text-slate-500">Categorized</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
            <Briefcase className="w-4 h-4 text-emerald-400" /> Internships
          </div>
          <div className="text-2xl font-bold text-white">{user.experiences?.length || 0}</div>
          <div className="text-[11px] text-slate-500">Experiences</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
            <Award className="w-4 h-4 text-amber-400" /> Credentials
          </div>
          <div className="text-2xl font-bold text-white">
            {(user.certifications?.length || 0) + (user.achievements?.length || 0)}
          </div>
          <div className="text-[11px] text-slate-500">Awards & Certs</div>
        </div>
      </div>

      {/* PROFILE COMPLETION SCORE & CHECKLIST */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Profile Readiness Score</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Follow these recommended sections to reach a 100% recruiter-optimized portfolio.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-indigo-400">
              {completeness.score}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full transition-all duration-700"
            style={{ width: `${completeness.score}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {completeness.steps.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {step.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <span
                  className={`text-xs font-medium truncate ${
                    step.completed ? "text-slate-200" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS & CURRENT TEMPLATE CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template info card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Active Template</h3>
            <Link
              href="/dashboard/templates"
              className="text-xs text-indigo-400 hover:underline font-semibold"
            >
              Change Template →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">{currentTemplate.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                {currentTemplate.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400">{currentTemplate.description}</p>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
            <span>Accent Theme: <strong className="text-indigo-300 capitalize">{user.accentColor}</strong></span>
            <span>Mode: <strong className="text-slate-200 capitalize">{user.theme}</strong></span>
          </div>
        </div>

        {/* Public Share Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Public Share Link</h3>
          <p className="text-xs text-slate-400">
            Your portfolio is live and viewable without requiring sign in. Add this link to your resume, LinkedIn bio, and email signature.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 break-all select-all">
            {process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/p/{user.username}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href={`/p/${user.username}`}
              target="_blank"
              className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center transition-colors shadow-sm"
            >
              Open in New Tab
            </Link>
            <Link
              href="/dashboard/preview"
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium text-center transition-colors border border-slate-700"
            >
              Export PDF / QR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
