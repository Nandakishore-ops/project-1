"use client";

import { useEffect, useState } from "react";
import {
  FolderGit2,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Github,
  Sparkles,
  Loader2,
  Check,
  AlertCircle,
  X,
  Star,
} from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("React, Next.js, TypeScript, Tailwind CSS");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [highlights, setHighlights] = useState("");

  // AI suggestions state
  const [aiEnhanced, setAiEnhanced] = useState<{
    improvedDescription: string;
    bulletPoints: string[];
  } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setTechnologies("React, TypeScript, Tailwind CSS, Node.js");
    setGithubUrl("");
    setLiveUrl("");
    setFeatured(false);
    setHighlights("");
    setAiEnhanced(null);
    setShowModal(true);
  };

  const openEditModal = (proj: any) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description);
    setTechnologies(proj.technologies || "");
    setGithubUrl(proj.githubUrl || "");
    setLiveUrl(proj.liveUrl || "");
    setFeatured(Boolean(proj.featured));
    setHighlights(proj.highlights || "");
    setAiEnhanced(null);
    setShowModal(true);
  };

  const handleEnhanceWithAI = async () => {
    if (!title.trim()) {
      alert("Please provide at least a project title first.");
      return;
    }
    setEnhancing(true);

    try {
      const res = await fetch("/api/ai/improve-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          rawDescription: description,
          technologies,
          highlights,
        }),
      });

      const data = await res.json();
      if (data.enhanced) {
        setAiEnhanced(data.enhanced);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(false);
    }
  };

  const applyAIEnhancement = () => {
    if (!aiEnhanced) return;
    setDescription(aiEnhanced.improvedDescription);
    setHighlights(aiEnhanced.bulletPoints.join("; "));
    setAiEnhanced(null);
    setMessage({ text: "Applied AI-enhanced description & bullet points!", type: "success" });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const method = editingId ? "PUT" : "POST";
      const payload = {
        ...(editingId && { id: editingId }),
        title,
        description,
        technologies,
        githubUrl,
        liveUrl,
        featured,
        highlights,
      };

      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");

      setShowModal(false);
      setMessage({
        text: editingId ? "Project updated successfully!" : "New project added successfully!",
        type: "success",
      });
      fetchProjects();
      setTimeout(() => setMessage(null), 3500);
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to save project.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        setMessage({ text: "Project deleted", type: "success" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Engineering Projects</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Showcase your best software engineering projects, GitHub repositories, live demo links, and architectural highlights.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
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

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No projects added yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Add your full-stack apps, mobile apps, or hackathon projects with GitHub repos and live deployments.
            </p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Add First Project
            </button>
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-pink-400" /> Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                {proj.highlights && (
                  <div className="space-y-1 pt-1">
                    {proj.highlights.split(";").map((h: string, idx: number) => {
                      const clean = h.trim();
                      if (!clean) return null;
                      return (
                        <p key={idx} className="text-xs text-slate-400 flex items-start gap-1.5">
                          <span className="text-indigo-400">•</span>
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
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800 text-xs">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors ml-auto font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-400" />
                <span>{editingId ? "Edit Project" : "Add New Project"}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Project Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. DevPulse Cloud Telemetry"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800"
                    />
                    <span>Featured Project</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Technologies Used (Comma separated)
                </label>
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="e.g. Next.js, TypeScript, Tailwind, PostgreSQL, Docker"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" /> GitHub Repository Link
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://myproject.vercel.app"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Description & AI Enhancer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-300">
                    Project Description <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleEnhanceWithAI}
                    disabled={enhancing}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all"
                  >
                    {enhancing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Enhance with STAR Format
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what the project does, key technical problems solved, and architecture..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 leading-relaxed"
                />

                {/* AI Enhanced Suggestion Card */}
                {aiEnhanced && (
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        AI Enhanced STAR Summary
                      </span>
                      <button
                        type="button"
                        onClick={applyAIEnhancement}
                        className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
                      >
                        Apply to Project →
                      </button>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      {aiEnhanced.improvedDescription}
                    </p>

                    {aiEnhanced.bulletPoints.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-purple-500/20">
                        {aiEnhanced.bulletPoints.map((bp, i) => (
                          <p key={i} className="text-[11px] text-purple-200 flex items-start gap-1.5">
                            <span className="text-purple-400">•</span> {bp}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Key Engineering Highlights (Separated by semicolons)
                </label>
                <textarea
                  rows={2}
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  placeholder="e.g. Optimized database index queries by 40%; Built custom auth with JWT and Redis cache; Tested with Jest and Cypress"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? "Update Project" : "Add Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
