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
  Building,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
  FileCheck,
  QrCode,
  Share2,
  Check,
} from "lucide-react";
import { QRCodeModal } from "./QRCodeModal";
import { PDFDownloadButton } from "./PDFDownloadButton";

interface TemplateProps {
  user: any;
  isPublicView?: boolean;
}

export function CorporateProfessional({ user, isPublicView = false }: TemplateProps) {
  const [showQR, setShowQR] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p/${user.username}`
    : `https://portify.dev/p/${user.username}`;

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-300 dark:selection:bg-slate-800">
      {/* Top Corporate Nav */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-8 py-3.5 sticky top-0 z-40 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-400" />
            <span className="font-semibold tracking-wide text-sm">{user.name}</span>
            <span className="text-xs text-slate-400 hidden sm:inline">| Professional Dossier</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowQR(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={copyPublicUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Copied" : "Share Profile"}</span>
            </button>
            <PDFDownloadButton studentName={user.name} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* EXECUTIVE HEADER CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Candidate Profile
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {user.name}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium">
                {user.headline || "Engineering Graduate | Software Development"}
              </p>

              {/* Contact grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                {user.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`mailto:${user.email}`} className="hover:text-blue-600 truncate">
                      {user.email}
                    </a>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{user.address}</span>
                  </div>
                )}
                {user.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600 shrink-0" />
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {user.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                    <a href={user.github} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                      GitHub Repositories
                    </a>
                  </div>
                )}
              </div>
            </div>

            {user.avatar && (
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shrink-0 shadow-md">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* EXECUTIVE SUMMARY */}
        {user.summary && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Executive Summary</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {user.summary}
            </p>
          </div>
        )}

        {/* TWO COLUMN GRID: ACADEMICS & SKILLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {user.educations && user.educations.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Academic Record</span>
              </h2>

              <div className="space-y-5">
                {user.educations.map((edu: any) => (
                  <div key={edu.id} className="space-y-1.5 border-l-2 border-blue-600 pl-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {edu.college}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500 shrink-0">
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {edu.degree} {edu.branch && `(${edu.branch})`}
                    </p>
                    {edu.cgpa && (
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Academic Standing: <span className="text-emerald-600 dark:text-emerald-400">{edu.cgpa}</span>
                      </p>
                    )}
                    {edu.coursework && (
                      <p className="text-xs text-slate-500 pt-1 leading-normal">
                        Key Subjects: {edu.coursework}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Competencies */}
          {user.skills && user.skills.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Technical Competencies</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill: any) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700"
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                        ({skill.level})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROJECTS */}
        {user.projects && user.projects.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Project Implementations</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.projects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                          KEY PROJECT
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>

                    {proj.highlights && (
                      <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1 pt-1">
                        {proj.highlights.split(";").map((h: string, idx: number) => (
                          <li key={idx}>{h.trim()}</li>
                        ))}
                      </ul>
                    )}

                    {proj.technologies && (
                      <p className="text-xs text-slate-500 pt-1">
                        <strong className="text-slate-700 dark:text-slate-300">Tech Stack:</strong> {proj.technologies}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1 font-medium"
                      >
                        <Github className="w-3.5 h-3.5" /> Repository
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ml-auto font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Deployment
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {user.experiences && user.experiences.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Professional Experience & Internships</span>
            </h2>

            <div className="space-y-5">
              {user.experiences.map((exp: any) => (
                <div key={exp.id} className="space-y-1.5 border-l-2 border-slate-300 dark:border-slate-700 pl-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {exp.role} — <span className="font-semibold text-slate-600 dark:text-slate-400">{exp.company}</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  {exp.location && <p className="text-xs text-slate-500">{exp.location}</p>}
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS & HONORS */}
        {(user.certifications?.length > 0 || user.achievements?.length > 0) && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Credentials & Honors</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {user.certifications?.map((c: any) => (
                <div key={c.id} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">{c.name}</div>
                  <div className="text-slate-600 dark:text-slate-400">{c.issuer} {c.issueDate && `(${c.issueDate})`}</div>
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline block pt-1">
                      Verification Link →
                    </a>
                  )}
                </div>
              ))}
              {user.achievements?.map((a: any) => (
                <div key={a.id} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">{a.title}</div>
                  {a.description && <div className="text-slate-600 dark:text-slate-400 leading-relaxed">{a.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="pt-4 pb-8 text-center text-xs text-slate-500">
          <span>{user.name} • Portify Corporate Dossier • {new Date().getFullYear()}</span>
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
