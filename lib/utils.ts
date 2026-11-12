import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ProfileCompleteness {
  score: number;
  steps: {
    id: string;
    label: string;
    completed: boolean;
    weight: number;
    href: string;
  }[];
}

export function calculateCompleteness(user: any): ProfileCompleteness {
  if (!user) {
    return { score: 0, steps: [] };
  }

  const steps = [
    {
      id: "personal",
      label: "Basic Info & Profile Photo",
      completed: Boolean(user.name && user.email && user.phone && user.avatar),
      weight: 15,
      href: "/dashboard/profile",
    },
    {
      id: "summary",
      label: "Headline & Professional Summary",
      completed: Boolean(user.headline && user.summary && user.summary.length > 20),
      weight: 15,
      href: "/dashboard/profile",
    },
    {
      id: "education",
      label: "B.Tech / College Details & CGPA",
      completed: Boolean(user.educations && user.educations.length > 0),
      weight: 20,
      href: "/dashboard/education",
    },
    {
      id: "skills",
      label: "Technical & Soft Skills (Min 5)",
      completed: Boolean(user.skills && user.skills.length >= 5),
      weight: 15,
      href: "/dashboard/skills",
    },
    {
      id: "projects",
      label: "Projects with GitHub/Demo (Min 2)",
      completed: Boolean(user.projects && user.projects.length >= 2),
      weight: 20,
      href: "/dashboard/projects",
    },
    {
      id: "experience",
      label: "Internships or Experience",
      completed: Boolean(user.experiences && user.experiences.length > 0),
      weight: 10,
      href: "/dashboard/experience",
    },
    {
      id: "achievements",
      label: "Certifications & Achievements",
      completed: Boolean(
        (user.certifications && user.certifications.length > 0) ||
        (user.achievements && user.achievements.length > 0)
      ),
      weight: 5,
      href: "/dashboard/achievements",
    },
  ];

  const score = steps.reduce((acc, step) => (step.completed ? acc + step.weight : acc), 0);

  return {
    score: Math.min(score, 100),
    steps,
  };
}

export const ACCENT_COLORS: Record<string, { name: string; hex: string; ring: string; bg: string; text: string; gradient: string }> = {
  indigo: {
    name: "Electric Indigo",
    hex: "#6366f1",
    ring: "ring-indigo-500",
    bg: "bg-indigo-600",
    text: "text-indigo-400",
    gradient: "from-indigo-500 to-purple-600",
  },
  emerald: {
    name: "Emerald Tech",
    hex: "#10b981",
    ring: "ring-emerald-500",
    bg: "bg-emerald-600",
    text: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-600",
  },
  violet: {
    name: "Cyber Violet",
    hex: "#8b5cf6",
    ring: "ring-violet-500",
    bg: "bg-violet-600",
    text: "text-violet-400",
    gradient: "from-violet-500 to-fuchsia-600",
  },
  cyan: {
    name: "Neon Cyan",
    hex: "#06b6d4",
    ring: "ring-cyan-500",
    bg: "bg-cyan-600",
    text: "text-cyan-400",
    gradient: "from-cyan-500 to-blue-600",
  },
  amber: {
    name: "Golden Amber",
    hex: "#f59e0b",
    ring: "ring-amber-500",
    bg: "bg-amber-600",
    text: "text-amber-400",
    gradient: "from-amber-500 to-orange-600",
  },
  rose: {
    name: "Rose Quartz",
    hex: "#f43f5e",
    ring: "ring-rose-500",
    bg: "bg-rose-600",
    text: "text-rose-400",
    gradient: "from-rose-500 to-pink-600",
  },
};

export const TEMPLATES = [
  {
    id: "modern-developer",
    name: "Modern Developer",
    badge: "Most Popular",
    description: "Sleek terminal & dev-focused aesthetic with interactive badge tech stack, code card borders, and GitHub vibe.",
    previewColor: "#6366f1",
    features: ["Code-styled headers", "Interactive project tech badges", "GitHub link integration", "B.Tech CGPA highlights"],
  },
  {
    id: "minimal-professional",
    name: "Minimal Professional",
    badge: "Clean & Elegant",
    description: "Subtle typography, generous whitespace, refined borders, and distilled recruiter-first layout.",
    previewColor: "#64748b",
    features: ["Distraction-free reading", "Editorial layout", "Clean timeline", "High recruiter conversion"],
  },
  {
    id: "creative-developer",
    name: "Creative Developer",
    badge: "Bold & Vibrant",
    description: "Dynamic gradients, glow effects, floating cards, and animated-feel interactive elements.",
    previewColor: "#ec4899",
    features: ["Glowing gradient cards", "Vibrant skill pills", "Showcase hero header", "Eye-catching animations"],
  },
  {
    id: "corporate-professional",
    name: "Corporate Professional",
    badge: "Executive Standard",
    description: "Structured, refined navy/slate executive layout tailored for MNC, enterprise, and corporate recruitment.",
    previewColor: "#0f766e",
    features: ["Formal executive summary", "Structured credential grids", "Corporate timeline", "Formal typography"],
  },
];
