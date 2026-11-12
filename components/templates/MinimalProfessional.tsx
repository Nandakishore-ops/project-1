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
  QrCode,
  Share2,
  Check,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
} from "lucide-react";
import { QRCodeModal } from "./QRCodeModal";
import { PDFDownloadButton } from "./PDFDownloadButton";

interface TemplateProps {
  user: any;
  isPublicView?: boolean;
}

export function MinimalProfessional({ user, isPublicView = false }: TemplateProps) {
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* Top clean nav */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
            {user.name}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowQR(true)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={copyPublicUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Copied" : "Share"}</span>
            </button>
            <PDFDownloadButton studentName={user.name} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-14">
        {/* HERO / BIO */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                {user.name}
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal">
                {user.headline || "Engineering Student & Developer"}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                {user.address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {user.address}
                  </span>
                )}
                {user.email && (
                  <a href={`mailto:${user.email}`} className="flex items-center gap-1 hover:underline">
                    <Mail className="w-3.5 h-3.5" /> {user.email}
                  </a>
                )}
                {user.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {user.phone}
                  </span>
                )}
              </div>
            </div>

            {user.avatar && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0 shadow-sm">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-200/80 dark:border-neutral-800/80">
            {user.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
            {user.leetcode && (
              <a
                href={user.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" /> LeetCode
              </a>
            )}
            {user.twitter && (
              <a
                href={user.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" /> Twitter
              </a>
            )}
          </div>

          {/* About Me */}
          {user.summary && (
            <div className="pt-2">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                About
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {user.summary}
              </p>
            </div>
          )}
        </section>

        {/* EDUCATION */}
        {user.educations && user.educations.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              Education
            </h2>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {user.educations.map((edu: any) => (
                <div key={edu.id} className="py-4 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {edu.college}
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {edu.degree} {edu.branch && `• ${edu.branch}`}
                  </p>
                  {edu.cgpa && (
                    <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                      CGPA / Grade: {edu.cgpa}
                    </p>
                  )}
                  {edu.coursework && (
                    <p className="text-xs text-neutral-500 pt-0.5">
                      Coursework: {edu.coursework}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {user.skills && user.skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill: any) => (
                <span
                  key={skill.id}
                  className="px-2.5 py-1 rounded-md text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {user.projects && user.projects.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              Selected Projects
            </h2>
            <div className="space-y-6">
              {user.projects.map((proj: any) => (
                <div key={proj.id} className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                      {proj.title}
                      {proj.featured && (
                        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                          Featured
                        </span>
                      )}
                    </h3>

                    <div className="flex items-center gap-3 text-xs">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
                        >
                          Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.highlights && (
                    <ul className="text-xs text-neutral-500 dark:text-neutral-400 list-disc list-inside space-y-1 pt-1">
                      {proj.highlights.split(";").map((h: string, idx: number) => (
                        <li key={idx}>{h.trim()}</li>
                      ))}
                    </ul>
                  )}

                  {proj.technologies && (
                    <p className="text-xs text-neutral-500">
                      Built with: {proj.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {user.experiences && user.experiences.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              Experience
            </h2>
            <div className="space-y-5">
              {user.experiences.map((exp: any) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {exp.role} <span className="font-normal text-neutral-500">at {exp.company}</span>
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-neutral-500">{exp.location}</p>
                  )}
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        {(user.certifications?.length > 0 || user.achievements?.length > 0) && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              Certifications & Honors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.certifications?.map((c: any) => (
                <div key={c.id} className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs space-y-1">
                  <div className="font-medium text-neutral-900 dark:text-white">{c.name}</div>
                  <div className="text-neutral-500">{c.issuer} {c.issueDate && `• ${c.issueDate}`}</div>
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 hover:underline block pt-1">
                      Verify Credential →
                    </a>
                  )}
                </div>
              ))}
              {user.achievements?.map((a: any) => (
                <div key={a.id} className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs space-y-1">
                  <div className="font-medium text-neutral-900 dark:text-white">{a.title}</div>
                  {a.description && <div className="text-neutral-500 leading-relaxed">{a.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>{user.name} • Portify</span>
          <span>{new Date().getFullYear()}</span>
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
