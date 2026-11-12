"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  Save,
  Loader2,
  Check,
  AlertCircle,
  X,
} from "lucide-react";

export default function EducationPage() {
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("Bachelor of Technology (B.Tech)");
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [cgpa, setCgpa] = useState("");
  const [startYear, setStartYear] = useState("2022");
  const [endYear, setEndYear] = useState("2026");
  const [coursework, setCoursework] = useState(
    "Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Object-Oriented Programming"
  );

  const courseworkSuggestions = [
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Operating Systems",
    "Computer Networks",
    "System Design",
    "Object Oriented Programming (OOP)",
    "Distributed Systems",
    "Compiler Design",
    "Artificial Intelligence & Machine Learning",
    "Cloud Computing",
  ];

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      if (data.educations) {
        setEducations(data.educations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setCollege("");
    setDegree("Bachelor of Technology (B.Tech)");
    setBranch("Computer Science & Engineering");
    setCgpa("");
    setStartYear("2022");
    setEndYear("2026");
    setCoursework(
      "Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks"
    );
    setShowModal(true);
  };

  const openEditModal = (edu: any) => {
    setEditingId(edu.id);
    setCollege(edu.college);
    setDegree(edu.degree);
    setBranch(edu.branch || "");
    setCgpa(edu.cgpa || "");
    setStartYear(edu.startYear);
    setEndYear(edu.endYear);
    setCoursework(edu.coursework || "");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const method = editingId ? "PUT" : "POST";
      const payload = {
        ...(editingId && { id: editingId }),
        college,
        degree,
        branch,
        cgpa,
        startYear,
        endYear,
        coursework,
      };

      const res = await fetch("/api/education", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save education");

      setShowModal(false);
      setMessage({
        text: editingId ? "Education record updated!" : "New education record added!",
        type: "success",
      });
      fetchEducations();
      setTimeout(() => setMessage(null), 3500);
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to save record.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      const res = await fetch(`/api/education?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEducations(educations.filter((e) => e.id !== id));
        setMessage({ text: "Education record removed", type: "success" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCoursework = (course: string) => {
    const list = coursework
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    if (list.includes(course)) {
      setCoursework(list.filter((c) => c !== course).join(", "));
    } else {
      setCoursework([...list, course].join(", "));
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Loading academic records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Academics & Education</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Showcase your B.Tech college, branch, CGPA, graduation timeline, and relevant engineering coursework.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Education
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

      {/* Education List */}
      <div className="space-y-4">
        {educations.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <GraduationCap className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No education added yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Add your B.Tech degree, college, branch, and CGPA to highlight your academic background to recruiters.
            </p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Add B.Tech Degree
            </button>
          </div>
        ) : (
          educations.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{edu.college}</h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-400">
                    {edu.degree} {edu.branch && `• ${edu.branch}`}
                  </p>
                  {edu.cgpa && (
                    <div className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mt-1">
                      CGPA / Grade: {edu.cgpa}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(edu)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Edit Record"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {edu.coursework && (
                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] font-mono text-slate-400 mb-1.5">Coursework / Key Subjects:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.split(",").map((c: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {c.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <span>{editingId ? "Edit Education Record" : "Add Education Record"}</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  College / Institute Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Delhi Technological University (DTU)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Degree</label>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. Bachelor of Technology (B.Tech)"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Branch / Major</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science & Engg"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CGPA / Score</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g. 9.18 / 10"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Start Year</label>
                  <input
                    type="text"
                    required
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    placeholder="2022"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">End / Grad Year</label>
                  <input
                    type="text"
                    required
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Relevant Coursework (Comma separated)
                </label>
                <textarea
                  rows={2}
                  value={coursework}
                  onChange={(e) => setCoursework(e.target.value)}
                  placeholder="DSA, DBMS, OS, Computer Networks..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                />

                <div className="pt-2">
                  <p className="text-[11px] text-slate-400 mb-1 font-mono">Quick-add popular courses:</p>
                  <div className="flex flex-wrap gap-1">
                    {courseworkSuggestions.map((course) => {
                      const active = coursework.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => toggleCoursework(course)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all ${
                            active
                              ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {course} {active && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>
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
                  <span>{editingId ? "Update Record" : "Add Record"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
