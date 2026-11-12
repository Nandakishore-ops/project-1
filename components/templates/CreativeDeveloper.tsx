"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Sparkles,
  Rocket,
  GraduationCap,
  Briefcase,
  Trophy,
  Layers,
  Code,
  QrCode,
  Share2,
  Check,
} from "lucide-react";
import { QRCodeModal } from "./QRCodeModal";
import { PDFDownloadButton } from "./PDFDownloadButton";
import { ACCENT_COLORS } from "@/lib/utils";

interface TemplateProps {
  user: any;
  isPublicView?: boolean;
}

export function CreativeDeveloper({ user, isPublicView = false }: TemplateProps) {
  const [showQR, setShowQR] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const accentKey = user.accentColor || "violet";
  const accent = ACCENT_COLORS[accentKey] || ACCENT_COLORS.violet;

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p/${user.username}`
    : `https://portify.dev/p/${user.username}`;

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0c0d14] text-slate-100 font-sans relative overflow-hidden">
      {/* Dynamic ambient gradient glow backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0c0d14]/75 border-b border-purple-500/20 px-4 sm:px-8 py-3.5 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-gradient-to-tr from-pink-500 to-violet-600 text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-bold tracking-tight text-white">{user.name}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowQR(true)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-purple-300 transition-colors"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={copyPublicUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-xs font-semibold text-purple-300 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Copied" : "Share"}</span>
            </button>
            <PDFDownloadButton studentName={user.name} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16 relative z-10">
        {/* HERO */}
        <section className="relative pt-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-pink-300 text-xs font-medium">
                <Rocket className="w-3.5 h-3.5 animate-bounce" />
                <span>Next-Gen Engineering Mindset</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Crafting digital experiences with{" "}
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                  passion & code.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
                {user.headline || "Final Year B.Tech Student | Innovator & Problem Solver"}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-slate-400">
                {user.address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" /> {user.address}
                  </span>
                )}
                {user.email && (
                  <a href={`mailto:${user.email}`} className="flex items-center gap-1 hover:text-pink-300 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-purple-400" /> {user.email}
                  </a>
                )}
                {user.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> {user.phone}
                  </span>
                )}
              </div>

              {/* Social badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-xs font-semibold text-white shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-xs font-semibold text-blue-300 shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                  </a>
                )}
                {user.leetcode && (
                  <a
                    href={user.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-xs font-semibold text-amber-300 shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    <Code className="w-4 h-4 text-amber-400" /> LeetCode
                  </a>
                )}
                {user.portfolioUrl && (
                  <a
                    href={user.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-xs font-semibold text-emerald-300 shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    <Globe className="w-4 h-4 text-emerald-400" /> Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* Glowing Avatar */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 animate-tilt" />
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden bg-slate-950 border-2 border-purple-400/50 shadow-2xl p-1">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-950/40 text-purple-200 text-4xl font-black">
                    {user.name?.charAt(0) || "P"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About Me card */}
          {user.summary && (
            <div className="mt-10 p-7 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 shadow-2xl relative">
              <div className="flex items-center gap-2 text-pink-400 text-sm font-bold mb-3">
                <Sparkles className="w-4 h-4" />
                <span>About Me</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {user.summary}
              </p>
            </div>
          )}
        </section>

        {/* PROJECTS */}
        {user.projects && user.projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                <Layers className="w-7 h-7 text-pink-400" />
                <span>Featured Creations</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.projects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-purple-500/20 p-6 flex flex-col justify-between hover:border-pink-500/40 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-sm">
                          TOP PICK
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>

                    {proj.highlights && (
                      <div className="space-y-1.5 pt-1">
                        {proj.highlights.split(";").map((h: string, idx: number) => {
                          const clean = h.trim();
                          if (!clean) return null;
                          return (
                            <p key={idx} className="text-xs text-slate-400 flex items-start gap-1.5">
                              <span className="text-pink-400">⚡</span>
                              <span>{clean}</span>
                            </p>
                          );
                        })}
                      </div>
                    )}

                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.split(",").map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-5 mt-4 border-t border-purple-500/10">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Launch
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {user.skills && user.skills.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                <Code className="w-7 h-7 text-violet-400" />
                <span>Skills & Superpowers</span>
              </h2>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 space-y-4">
              <div className="flex flex-wrap gap-2.5">
                {user.skills.map((skill: any) => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-purple-900/40 to-slate-900/60 border border-purple-500/30 hover:border-pink-500/50 text-xs font-semibold text-slate-200 transition-all hover:scale-105"
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-normal">
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* EDUCATION & EXPERIENCE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {user.educations && user.educations.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-purple-500/20 pb-3">
                <GraduationCap className="w-6 h-6 text-pink-400" />
                <span>Education</span>
              </h2>

              <div className="space-y-4">
                {user.educations.map((edu: any) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-slate-900/50 border border-purple-500/20 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                      <span className="text-xs text-pink-400 font-mono">
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-violet-300">{edu.college}</p>
                    {edu.branch && <p className="text-xs text-slate-300">{edu.branch}</p>}
                    {edu.cgpa && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {user.experiences && user.experiences.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-purple-500/20 pb-3">
                <Briefcase className="w-6 h-6 text-cyan-400" />
                <span>Experience</span>
              </h2>

              <div className="space-y-4">
                {user.experiences.map((exp: any) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-slate-900/50 border border-purple-500/20 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <span className="text-xs text-cyan-400 font-mono">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-pink-300">{exp.company}</p>
                    {exp.description && (
                      <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ACHIEVEMENTS & CERTIFICATIONS */}
        {(user.achievements?.length > 0 || user.certifications?.length > 0) && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-purple-500/20 pb-3">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>Honors & Certifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.achievements?.map((ach: any) => (
                <div key={ach.id} className="p-4 rounded-2xl bg-slate-900/50 border border-purple-500/20 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400">ACHIEVEMENT</div>
                  <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                  {ach.description && <p className="text-xs text-slate-300">{ach.description}</p>}
                </div>
              ))}
              {user.certifications?.map((cert: any) => (
                <div key={cert.id} className="p-4 rounded-2xl bg-slate-900/50 border border-purple-500/20 space-y-1.5">
                  <div className="text-xs font-bold text-cyan-400">CERTIFICATE</div>
                  <h3 className="text-sm font-bold text-white">{cert.name}</h3>
                  <p className="text-xs text-slate-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="pt-8 border-t border-purple-500/20 flex items-center justify-between text-xs text-slate-500">
          <span>{user.name}</span>
          <span>Portify Creative Edition</span>
        </footer>
      </main>

      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        url={publicUrl}
        name={user.name}
      />
    </div>
  );
}
