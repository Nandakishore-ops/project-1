"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Briefcase,
  Award,
  Palette,
  Eye,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: any;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Profile & About Me",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "B.Tech & Education",
      href: "/dashboard/education",
      icon: GraduationCap,
    },
    {
      label: "Skills & Languages",
      href: "/dashboard/skills",
      icon: Code2,
    },
    {
      label: "Projects",
      href: "/dashboard/projects",
      icon: FolderGit2,
    },
    {
      label: "Internships & Exp",
      href: "/dashboard/experience",
      icon: Briefcase,
    },
    {
      label: "Certifications & Honors",
      href: "/dashboard/achievements",
      icon: Award,
    },
    {
      label: "Templates & Styling",
      href: "/dashboard/templates",
      icon: Palette,
    },
    {
      label: "Live Preview & PDF",
      href: "/dashboard/preview",
      icon: Eye,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4 hidden md:flex flex-col justify-between shrink-0 h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto">
      <div className="space-y-6">
        {/* Student Mini Profile */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                {user.name?.charAt(0) || "P"}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
            <p className="text-[11px] text-slate-400 truncate">/p/{user.username}</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <a
          href={`/p/${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 text-xs font-mono text-slate-300 hover:text-white transition-colors"
        >
          <span className="truncate">View Public URL</span>
          <ExternalLink className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        </a>
      </div>
    </aside>
  );
}
