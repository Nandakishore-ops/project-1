"use client";

import { useEffect, useState } from "react";
import {
  User,
  Sparkles,
  Camera,
  Upload,
  Save,
  Check,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code2,
} from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generatingHeadlines, setGeneratingHeadlines] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Profile Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");

  // Socials
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  // AI suggestions list
  const [headlineSuggestions, setHeadlineSuggestions] = useState<string[]>([]);
  const [summarySuggestions, setSummarySuggestions] = useState<{
    impact: string;
    creative: string;
    concise: string;
  } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.user) {
        setName(data.user.name || "");
        setEmail(data.user.email || "");
        setPhone(data.user.phone || "");
        setAddress(data.user.address || "");
        setUsername(data.user.username || "");
        setAvatar(data.user.avatar || "");
        setHeadline(data.user.headline || "");
        setSummary(data.user.summary || "");
        setGithub(data.user.github || "");
        setLinkedin(data.user.linkedin || "");
        setTwitter(data.user.twitter || "");
        setLeetcode(data.user.leetcode || "");
        setPortfolioUrl(data.user.portfolioUrl || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          username,
          avatar,
          headline,
          summary,
          github,
          linkedin,
          twitter,
          leetcode,
          portfolioUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setMessage({ text: "Profile details saved successfully!", type: "success" });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to save profile.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateHeadlines = async () => {
    setGeneratingHeadlines(true);
    try {
      const res = await fetch("/api/ai/generate-headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.headlines) {
        setHeadlineSuggestions(data.headlines);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingHeadlines(false);
    }
  };

  const handleGenerateSummary = async () => {
    setGeneratingSummary(true);
    try {
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.summaries) {
        setSummarySuggestions(data.summaries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingSummary(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Loading your profile data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Profile & Identity</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Update your personal details, profile photograph, social accounts, and use AI to craft professional summaries.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
          }`}
        >
          {message.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* AVATAR ROW */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-indigo-400" /> Profile Photograph
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-10 h-10 text-slate-500" />
              )}
            </div>

            <div className="space-y-2 flex-1 text-center sm:text-left">
              <p className="text-xs text-slate-400">
                A clean, professional headshot helps recruiters connect a face to your projects.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm">
                  <Upload className="w-3.5 h-3.5" /> Upload File
                  <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                </label>
                <input
                  type="url"
                  placeholder="Or enter image URL..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1 min-w-[220px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BASIC CONTACT INFO */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" /> Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address (Read-only)</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-400 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Location / Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. New Delhi, India"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Custom Portfolio Slug (Public URL)
            </label>
            <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-indigo-500">
              <span className="px-3 text-xs text-slate-500 font-mono">portify.dev/p/</span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                className="w-full py-2.5 pr-4 bg-transparent text-slate-100 text-sm focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* HEADLINE WITH AI GENERATOR */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Professional Headline
            </h2>
            <button
              type="button"
              onClick={handleGenerateHeadlines}
              disabled={generatingHeadlines}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all"
            >
              {generatingHeadlines ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> AI Suggest Headlines
                </>
              )}
            </button>
          </div>

          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Final Year B.Tech CSE | Full Stack Developer | Distributed Systems"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
          />

          {/* AI Headline Suggestions */}
          {headlineSuggestions.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-mono text-purple-300">Click any AI headline to apply:</p>
              <div className="space-y-1.5">
                {headlineSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeadline(sug)}
                    className="w-full text-left p-2.5 rounded-xl bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/20 text-xs text-purple-200 transition-colors flex items-center justify-between group"
                  >
                    <span>{sug}</span>
                    <span className="text-[10px] text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Use this
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ABOUT ME / SUMMARY WITH AI GENERATOR */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> About Me / Professional Summary
            </h2>
            <button
              type="button"
              onClick={handleGenerateSummary}
              disabled={generatingSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-all"
            >
              {generatingSummary ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> AI Generate Summary
                </>
              )}
            </button>
          </div>

          <textarea
            rows={6}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a compelling overview of your engineering journey, technologies, and career aspirations..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 leading-relaxed"
          />

          {/* AI Summary Suggestions Variations */}
          {summarySuggestions && (
            <div className="space-y-3 pt-2">
              <p className="text-[11px] font-mono text-pink-300">Pick an AI-synthesized tone to apply:</p>

              <div className="grid grid-cols-1 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">Technical & Impact-Driven</span>
                    <button
                      type="button"
                      onClick={() => setSummary(summarySuggestions.impact)}
                      className="text-xs font-semibold text-purple-400 hover:underline"
                    >
                      Apply This →
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line line-clamp-3">
                    {summarySuggestions.impact}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-pink-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-300">Creative & Passionate</span>
                    <button
                      type="button"
                      onClick={() => setSummary(summarySuggestions.creative)}
                      className="text-xs font-semibold text-pink-400 hover:underline"
                    >
                      Apply This →
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line line-clamp-3">
                    {summarySuggestions.creative}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300">Concise & Recruiter-First</span>
                    <button
                      type="button"
                      onClick={() => setSummary(summarySuggestions.concise)}
                      className="text-xs font-semibold text-indigo-400 hover:underline"
                    >
                      Apply This →
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line line-clamp-3">
                    {summarySuggestions.concise}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SOCIAL & DEVELOPER PROFILES */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" /> Social Links & Developer Profiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" /> GitHub Profile URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" /> LeetCode Profile URL
              </label>
              <input
                type="url"
                value={leetcode}
                onChange={(e) => setLeetcode(e.target.value)}
                placeholder="https://leetcode.com/username"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5 text-sky-400" /> Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://x.com/username"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-xl shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Profile Details
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
