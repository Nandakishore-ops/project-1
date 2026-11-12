"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Palette,
  Check,
  Eye,
  ExternalLink,
  Save,
  Loader2,
  AlertCircle,
  Moon,
  Sun,
  Shield,
  Lock,
  Globe,
} from "lucide-react";
import { TEMPLATES, ACCENT_COLORS } from "@/lib/utils";

export default function TemplatesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [selectedTemplate, setSelectedTemplate] = useState("modern-developer");
  const [accentColor, setAccentColor] = useState("indigo");
  const [theme, setTheme] = useState("dark");
  const [isPublic, setIsPublic] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.user) {
        setSelectedTemplate(data.user.template || "modern-developer");
        setAccentColor(data.user.accentColor || "indigo");
        setTheme(data.user.theme || "dark");
        setIsPublic(data.user.isPublic ?? true);
        setUsername(data.user.username || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: selectedTemplate,
          accentColor,
          theme,
          isPublic,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save styling");

      setMessage({ text: "Portfolio design & settings saved successfully!", type: "success" });
      setTimeout(() => setMessage(null), 3500);
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Loading template configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Templates & Aesthetic Styling</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Switch between 4 recruiter-tested layouts, customize brand colors, and control public visibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/preview"
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Preview</span>
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Preferences</span>
          </button>
        </div>
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

      {/* 1. TEMPLATE SELECTOR */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
          1. Choose Signature Template
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all space-y-4 relative ${
                  isSelected
                    ? "bg-indigo-950/20 border-indigo-500 shadow-xl shadow-indigo-500/10"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{tmpl.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                      {tmpl.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{tmpl.description}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-slate-500">Key Features:</span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                    {tmpl.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ACCENT COLOR CUSTOMIZATION */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
          2. Accent Brand Color
        </h2>
        <p className="text-xs text-slate-400">
          Sets primary highlights, badge borders, and button gradients across your portfolio.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          {Object.entries(ACCENT_COLORS).map(([key, col]) => {
            const isSelected = accentColor === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setAccentColor(key)}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center gap-2 text-center ${
                  isSelected
                    ? "bg-slate-950 border-white shadow-lg"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full shadow-md flex items-center justify-center text-white"
                  style={{ backgroundColor: col.hex }}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
                <span className="text-xs font-semibold text-slate-200">{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. THEME MODE & PRIVACY SETTINGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Theme Mode */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
            3. Default Display Theme
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                theme === "dark"
                  ? "bg-slate-950 border-indigo-500 shadow-md"
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <Moon className="w-5 h-5 mx-auto text-indigo-400" />
              <div className="text-xs font-bold text-white">Dark Theme</div>
              <div className="text-[11px] text-slate-500">Default for developers</div>
            </button>

            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                theme === "light"
                  ? "bg-slate-950 border-indigo-500 shadow-md"
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <Sun className="w-5 h-5 mx-auto text-amber-400" />
              <div className="text-xs font-bold text-white">Light Theme</div>
              <div className="text-[11px] text-slate-500">High contrast reading</div>
            </button>
          </div>
        </div>

        {/* Public Visibility Toggle */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
            4. Portfolio Visibility
          </h2>

          <div
            onClick={() => setIsPublic(!isPublic)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
              isPublic
                ? "bg-emerald-950/20 border-emerald-500/40"
                : "bg-slate-950/60 border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isPublic ? (
                  <Globe className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Lock className="w-5 h-5 text-amber-400" />
                )}
                <span className="text-sm font-bold text-white">
                  {isPublic ? "Public Portfolio" : "Private Portfolio"}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  isPublic ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                }`}
              >
                {isPublic ? "ACTIVE" : "HIDDEN"}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              {isPublic
                ? `Anyone with your link (/p/${username}) can view your portfolio.`
                : "Only you can preview this portfolio. Visitors will see a private notice."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
}
