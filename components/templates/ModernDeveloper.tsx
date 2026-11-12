"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Terminal,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  QrCode,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { QRCodeModal } from "./QRCodeModal";
import { PDFDownloadButton } from "./PDFDownloadButton";
import { ACCENT_COLORS } from "@/lib/utils";

interface TemplateProps {
  user: any;
  isPublicView?: boolean;
}

export function ModernDeveloper({ user, isPublicView = false }: TemplateProps) {
  const [showQR, setShowQR] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const accentKey = user.accentColor || "indigo";
  const accent = ACCENT_COLORS[accentKey] || ACCENT_COLORS.indigo;

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p/${user.username}`
    : `https://portify.dev/p/${user.username}`;

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Group skills by category
  const skillsByCategory: Record<string, any[]> = {
    languages: user.skills?.filter((s: any) => s.category === "languages") || [],
    technical: user.skills?.filter((s: any) => s.category === "technical") || [],
    tools: user.skills?.filter((s: any) => s.category === "tools") || [],
    soft: user.skills?.filter((s: any) => s.category === "soft") || [],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top command navigation bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-200 font-semibold">{user.username}</span>
            <span className="text-slate-600">/</span>
            <span className="hidden sm:inline text-indigo-400">portfolio.dev</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowQR(true)}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={copyPublicUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              title="Copy shareable link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
            </button>
            <PDFDownloadButton studentName={user.name} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-16">
        {/* HERO SECTION */}
        <section className="relative pt-6 pb-4">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5" />
                <span>Available for Full-time Roles & Internships</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Hi, I&apos;m <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">{user.name}</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
                {user.headline || "Final Year B.Tech Student & Software Engineering Enthusiast"}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400 font-mono">
                {user.address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {user.address}
                  </span>
                )}
                {user.email && (
                  <a href={`mailto:${user.email}`} className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-slate-500" /> {user.email}
                  </a>
                )}
                {user.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" /> {user.phone}
                  </span>
                )}
              </div>

              {/* Social Media Links */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 transition-all shadow-sm"
                  >
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub</span>
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 transition-all shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {user.leetcode && (
                  <a
                    href={user.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 transition-all shadow-sm"
                  >
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span>LeetCode</span>
                  </a>
                )}
                {user.twitter && (
                  <a
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 transition-all shadow-sm"
                  >
                    <Twitter className="w-4 h-4 text-sky-400" />
                    <span>Twitter/X</span>
                  </a>
                )}
                {user.portfolioUrl && (
                  <a
                    href={user.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 transition-all shadow-sm"
                  >
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Avatar Photo */}
            <div className="relative shrink-0">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-2xl p-1">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800/80 text-slate-400 text-3xl font-bold font-mono">
                    {user.name?.charAt(0) || "P"}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-mono text-emerald-400 flex items-center gap-1 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>OPEN_TO_WORK</span>
              </div>
            </div>
          </div>

          {/* About Me / Professional Summary */}
          {user.summary && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>cat about_me.txt</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {user.summary}
              </p>
            </div>
          )}
        </section>

        {/* EDUCATION SECTION (B.Tech Spotlight) */}
        {user.educations && user.educations.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <GraduationCap className="w-6 h-6 text-indigo-400" />
                <span>Education & Academics</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">Degree & Coursework</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.educations.map((edu: any) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-indigo-400">{edu.college}</p>
                    {edu.branch && (
                      <p className="text-xs text-slate-300">
                        Specialization: <span className="text-white font-medium">{edu.branch}</span>
                      </p>
                    )}
                    {edu.cgpa && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        <span>CGPA / Score:</span>
                        <span className="text-emerald-300 font-bold">{edu.cgpa}</span>
                      </div>
                    )}
                  </div>

                  {edu.coursework && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <p className="text-[11px] font-mono text-slate-400 mb-1.5">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.split(",").map((c: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                          >
                            {c.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS SECTION */}
        {user.skills && user.skills.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Code2 className="w-6 h-6 text-purple-400" />
                <span>Technical Skills & Competencies</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">{user.skills.length} skills listed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Programming Languages */}
              {skillsByCategory.languages.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
                    <span>// Programming Languages</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.languages.map((skill: any) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-200"
                      >
                        {skill.name}
                        {skill.level && (
                          <span className="text-[10px] text-purple-400/80 font-mono">({skill.level})</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical / Frameworks */}
              {skillsByCategory.technical.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
                    <span>// Frameworks & Libraries</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.technical.map((skill: any) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-200"
                      >
                        {skill.name}
                        {skill.level && (
                          <span className="text-[10px] text-indigo-400/80 font-mono">({skill.level})</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & DevOps */}
              {skillsByCategory.tools.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                    <span>// Developer Tools & DevOps</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.tools.map((skill: any) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-200"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Soft Skills */}
              {skillsByCategory.soft.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                    <span>// Soft Skills & Professional</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.soft.map((skill: any) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-200"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PROJECTS SECTION */}
        {user.projects && user.projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Code2 className="w-6 h-6 text-pink-400" />
                <span>Featured Engineering Projects</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">Live Demos & GitHub</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.projects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 shrink-0">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Highlights bullet points if any */}
                    {proj.highlights && (
                      <div className="space-y-1.5 pt-2">
                        {proj.highlights.split(";").map((h: string, hIdx: number) => {
                          const clean = h.trim();
                          if (!clean) return null;
                          return (
                            <p key={hIdx} className="text-xs text-slate-400 flex items-start gap-1.5">
                              <span className="text-indigo-400 mt-0.5">•</span>
                              <span>{clean}</span>
                            </p>
                          );
                        })}
                      </div>
                    )}

                    {/* Technologies tags */}
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.split(",").map((tech: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-800">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors ml-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WORK EXPERIENCE / INTERNSHIPS */}
        {user.experiences && user.experiences.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Briefcase className="w-6 h-6 text-emerald-400" />
                <span>Internships & Work Experience</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">Timeline</span>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-8">
              {user.experiences.map((exp: any) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 group-hover:scale-110 transition-transform" />

                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <span className="text-xs font-mono text-emerald-400">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="text-slate-200 font-semibold">{exp.company}</span>
                      {exp.location && <span>• {exp.location}</span>}
                      {exp.type && (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                          {exp.type}
                        </span>
                      )}
                    </div>

                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    )}

                    {exp.technologies && (
                      <p className="text-xs text-slate-400 font-mono pt-1">
                        Tech Stack: <span className="text-indigo-300">{exp.technologies}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        {(user.certifications?.length > 0 || user.achievements?.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Certifications */}
            {user.certifications && user.certifications.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Certifications</span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {user.certifications.map((cert: any) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-white">{cert.name}</h3>
                        <p className="text-xs text-indigo-400">{cert.issuer}</p>
                        {cert.issueDate && (
                          <p className="text-[11px] font-mono text-slate-500">Issued: {cert.issueDate}</p>
                        )}
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                          title="Verify Credential"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {user.achievements && user.achievements.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-pink-400" />
                    <span>Achievements & Honors</span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {user.achievements.map((ach: any) => (
                    <div
                      key={ach.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white">{ach.title}</h3>
                        {ach.date && (
                          <span className="text-[11px] font-mono text-slate-500 shrink-0">{ach.date}</span>
                        )}
                      </div>
                      {ach.description && (
                        <p className="text-xs text-slate-300 leading-relaxed">{ach.description}</p>
                      )}
                      {ach.link && (
                        <a
                          href={ach.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline pt-1"
                        >
                          View Verification <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* FOOTER */}
        <footer className="pt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} {user.name} • Built with Portify</p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${user.email}`} className="hover:text-indigo-400 transition-colors">
              Contact
            </a>
            <span>•</span>
            <button onClick={() => setShowQR(true)} className="hover:text-indigo-400 transition-colors">
              QR Code
            </button>
            <span>•</span>
            <button onClick={copyPublicUrl} className="hover:text-indigo-400 transition-colors">
              Share Portfolio
            </button>
          </div>
        </footer>
      </main>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        url={publicUrl}
        name={user.name}
      />
    </div>
  );
}
