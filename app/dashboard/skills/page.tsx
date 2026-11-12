"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Cpu,
  Smile,
  Terminal,
} from "lucide-react";

const SUGGESTIONS = {
  languages: ["C++", "Java", "Python", "TypeScript", "JavaScript", "SQL", "Go", "C#", "HTML5 & CSS3"],
  technical: [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Prisma ORM",
    "RESTful APIs",
    "GraphQL",
    "Redis",
    "WebSockets",
  ],
  tools: ["Git & GitHub", "Docker", "Linux / Bash", "Postman", "VS Code", "AWS (EC2/S3)", "Vercel", "Figma"],
  soft: [
    "Problem Solving (DSA)",
    "Agile Methodology",
    "Team Leadership",
    "Technical Communication",
    "Quick Learner",
    "Analytical Thinking",
  ],
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // New skill form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("languages");
  const [level, setLevel] = useState("Proficient");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.skills) setSkills(data.skills);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (skillName?: string, skillCategory?: string) => {
    const finalName = (skillName || name).trim();
    const finalCategory = skillCategory || category;
    if (!finalName) return;

    // Check if already exists
    if (skills.some((s) => s.name.toLowerCase() === finalName.toLowerCase())) {
      setMessage({ text: `Skill "${finalName}" is already in your list.`, type: "error" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalName,
          category: finalCategory,
          level,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add skill");

      setSkills([...skills, data.skill]);
      setName("");
      setMessage({ text: `Added "${finalName}"!`, type: "success" });
      setTimeout(() => setMessage(null), 2500);
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to add skill", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSkills(skills.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const categorizedSkills = {
    languages: skills.filter((s) => s.category === "languages"),
    technical: skills.filter((s) => s.category === "technical"),
    tools: skills.filter((s) => s.category === "tools"),
    soft: skills.filter((s) => s.category === "soft"),
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Loading skills inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Skills & Competencies</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Add programming languages, frameworks, developer tools, and soft skills. Click recommended tags to add instantly.
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

      {/* QUICK ADD FORM */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-indigo-400" /> Add Custom Skill
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g. Docker, TypeScript, Microservices..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="languages">Programming Language</option>
              <option value="technical">Technical / Framework</option>
              <option value="tools">Tools & DevOps</option>
              <option value="soft">Soft Skill</option>
            </select>
          </div>

          <div>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="Expert">Expert</option>
              <option value="Proficient">Proficient</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Beginner">Beginner</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => handleAddSkill()}
            disabled={saving || !name.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 flex items-center gap-1.5"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Add Skill to Portfolio</span>
          </button>
        </div>
      </div>

      {/* 4 CATEGORIES SHOWCASE & QUICK ADD CHIPS */}
      <div className="space-y-6">
        {/* 1. Programming Languages */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Programming Languages ({categorizedSkills.languages.length})</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
            {categorizedSkills.languages.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No programming languages added yet.</p>
            ) : (
              categorizedSkills.languages.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-200"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-purple-400/80 font-mono">({skill.level})</span>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-purple-400 hover:text-rose-400 transition-colors ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-mono text-slate-400 mb-1.5">1-Click Recommended Add:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.languages.map((s) => {
                const already = skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase());
                return (
                  <button
                    key={s}
                    disabled={already}
                    onClick={() => handleAddSkill(s, "languages")}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      already
                        ? "bg-slate-950/40 border-slate-800/50 text-slate-600 cursor-default"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50 hover:text-white"
                    }`}
                  >
                    + {s} {already && "✓"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Technical Skills & Frameworks */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Frameworks & Web Technologies ({categorizedSkills.technical.length})</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
            {categorizedSkills.technical.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No frameworks added yet.</p>
            ) : (
              categorizedSkills.technical.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-200"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-indigo-400/80 font-mono">({skill.level})</span>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-indigo-400 hover:text-rose-400 transition-colors ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-mono text-slate-400 mb-1.5">1-Click Recommended Add:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.technical.map((s) => {
                const already = skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase());
                return (
                  <button
                    key={s}
                    disabled={already}
                    onClick={() => handleAddSkill(s, "technical")}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      already
                        ? "bg-slate-950/40 border-slate-800/50 text-slate-600 cursor-default"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:text-white"
                    }`}
                  >
                    + {s} {already && "✓"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Developer Tools & DevOps */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Developer Tools & DevOps ({categorizedSkills.tools.length})</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
            {categorizedSkills.tools.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No tools added yet.</p>
            ) : (
              categorizedSkills.tools.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-200"
                >
                  <span>{skill.name}</span>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-cyan-400 hover:text-rose-400 transition-colors ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-mono text-slate-400 mb-1.5">1-Click Recommended Add:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.tools.map((s) => {
                const already = skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase());
                return (
                  <button
                    key={s}
                    disabled={already}
                    onClick={() => handleAddSkill(s, "tools")}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      already
                        ? "bg-slate-950/40 border-slate-800/50 text-slate-600 cursor-default"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white"
                    }`}
                  >
                    + {s} {already && "✓"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Soft Skills */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Smile className="w-4 h-4 text-emerald-400" />
              <span>Soft Skills & Professional Attributes ({categorizedSkills.soft.length})</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
            {categorizedSkills.soft.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No soft skills added yet.</p>
            ) : (
              categorizedSkills.soft.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-200"
                >
                  <span>{skill.name}</span>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-emerald-400 hover:text-rose-400 transition-colors ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-mono text-slate-400 mb-1.5">1-Click Recommended Add:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.soft.map((s) => {
                const already = skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase());
                return (
                  <button
                    key={s}
                    disabled={already}
                    onClick={() => handleAddSkill(s, "soft")}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      already
                        ? "bg-slate-950/40 border-slate-800/50 text-slate-600 cursor-default"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white"
                    }`}
                  >
                    + {s} {already && "✓"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
