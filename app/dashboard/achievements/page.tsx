"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Trophy,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Check,
  AlertCircle,
  X,
} from "lucide-react";

export default function AchievementsPage() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Cert Modal
  const [showCertModal, setShowCertModal] = useState(false);
  const [certName, setCertName] = useState("");
  const [certIssuer, setCertIssuer] = useState("Amazon Web Services (AWS)");
  const [certDate, setCertDate] = useState("2024");
  const [certUrl, setCertUrl] = useState("");
  const [savingCert, setSavingCert] = useState(false);

  // Achievement Modal
  const [showAchModal, setShowAchModal] = useState(false);
  const [achTitle, setAchTitle] = useState("");
  const [achCategory, setAchCategory] = useState("Hackathon");
  const [achDate, setAchDate] = useState("2025");
  const [achDesc, setAchDesc] = useState("");
  const [achLink, setAchLink] = useState("");
  const [savingAch, setSavingAch] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [certRes, achRes] = await Promise.all([
        fetch("/api/certifications"),
        fetch("/api/achievements"),
      ]);
      const certData = await certRes.json();
      const achData = await achRes.json();
      if (certData.certifications) setCertifications(certData.certifications);
      if (achData.achievements) setAchievements(achData.achievements);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCert(true);
    try {
      const res = await fetch("/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: certName,
          issuer: certIssuer,
          issueDate: certDate,
          credentialUrl: certUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add cert");

      setCertifications([data.certification, ...certifications]);
      setShowCertModal(false);
      setCertName("");
      setMessage({ text: "Certification added successfully!", type: "success" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setSavingCert(false);
    }
  };

  const handleDeleteCert = async (id: string) => {
    try {
      const res = await fetch(`/api/certifications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCertifications(certifications.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAch(true);
    try {
      const res = await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: achTitle,
          category: achCategory,
          date: achDate,
          description: achDesc,
          link: achLink,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add achievement");

      setAchievements([data.achievement, ...achievements]);
      setShowAchModal(false);
      setAchTitle("");
      setAchDesc("");
      setMessage({ text: "Achievement added successfully!", type: "success" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setSavingAch(false);
    }
  };

  const handleDeleteAch = async (id: string) => {
    try {
      const res = await fetch(`/api/achievements?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAchievements(achievements.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Loading certifications & honors...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Certifications & Achievements</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Validate your technical competence with industry certificates, hackathon honors, and coding contest ratings.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
          }`}
        >
          {message.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. CERTIFICATIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Certifications ({certifications.length})</span>
            </h2>
            <button
              onClick={() => setShowCertModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Certificate
            </button>
          </div>

          <div className="space-y-3">
            {certifications.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                No certifications added yet. Add AWS, Coursera, or Meta credentials.
              </div>
            ) : (
              certifications.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-amber-400">{c.issuer}</p>
                    {c.issueDate && (
                      <p className="text-[11px] font-mono text-slate-500">Issued: {c.issueDate}</p>
                    )}
                    {c.credentialUrl && (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline pt-0.5"
                      >
                        Verify Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteCert(c.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. ACHIEVEMENTS & HACKATHONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-pink-400" />
              <span>Honors & Hackathons ({achievements.length})</span>
            </h2>
            <button
              onClick={() => setShowAchModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Honor
            </button>
          </div>

          <div className="space-y-3">
            {achievements.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                No achievements added yet. Add Hackathon wins or LeetCode ratings.
              </div>
            ) : (
              achievements.map((a) => (
                <div
                  key={a.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                          {a.category || "Hackathon"}
                        </span>
                        {a.date && (
                          <span className="text-[11px] font-mono text-slate-500">{a.date}</span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white pt-1">{a.title}</h3>
                    </div>
                    <button
                      onClick={() => handleDeleteAch(a.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {a.description && (
                    <p className="text-xs text-slate-300 leading-relaxed">{a.description}</p>
                  )}

                  {a.link && (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-pink-400 hover:underline"
                    >
                      View Details / Proof <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Cert Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add Certification</h3>
              <button onClick={() => setShowCertModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Certificate Name *</label>
                <input
                  type="text"
                  required
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Issuer *</label>
                <input
                  type="text"
                  required
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  placeholder="e.g. AWS, Coursera, Meta, HackerRank"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    placeholder="e.g. July 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Verification URL</label>
                  <input
                    type="url"
                    value={certUrl}
                    onChange={(e) => setCertUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCert}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  {savingCert ? "Saving..." : "Add Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {showAchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add Honor or Hackathon Win</h3>
              <button onClick={() => setShowAchModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveAch} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={achTitle}
                  onChange={(e) => setAchTitle(e.target.value)}
                  placeholder="e.g. Smart India Hackathon Winner / LeetCode Knight"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={achCategory}
                    onChange={(e) => setAchCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Coding Contest">Coding Contest</option>
                    <option value="Academic">Academic</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Date / Year</label>
                  <input
                    type="text"
                    value={achDate}
                    onChange={(e) => setAchDate(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  value={achDesc}
                  onChange={(e) => setAchDesc(e.target.value)}
                  placeholder="Built an AI disaster management tool across 1,200 teams..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Proof / Link</label>
                <input
                  type="url"
                  value={achLink}
                  onChange={(e) => setAchLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAchModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAch}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  {savingAch ? "Saving..." : "Add Honor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
