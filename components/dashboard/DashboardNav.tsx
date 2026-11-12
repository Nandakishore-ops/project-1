"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Code2,
  ExternalLink,
  QrCode,
  LogOut,
  Sparkles,
  Share2,
  Check,
  User,
  Menu,
  X,
} from "lucide-react";
import { QRCodeModal } from "@/components/templates/QRCodeModal";

interface DashboardNavProps {
  user: any;
  completenessScore: number;
}

export function DashboardNav({ user, completenessScore }: DashboardNavProps) {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p/${user.username}`
    : `https://portify.dev/p/${user.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white hidden sm:inline">
              Portify
            </span>
          </Link>

          {/* Completeness Badge */}
          <Link
            href="/dashboard"
            className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs hover:border-slate-700 transition-colors"
          >
            <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${completenessScore}%` }}
              />
            </div>
            <span className="font-semibold text-slate-300">{completenessScore}% Complete</span>
          </Link>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Public Portfolio URL button */}
          <a
            href={`/p/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-xs font-semibold text-indigo-300 transition-all shadow-sm"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Share Link */}
          <button
            onClick={handleCopy}
            title="Copy Public Link"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>

          {/* QR Code */}
          <button
            onClick={() => setShowQR(true)}
            title="Scan QR Code"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        url={publicUrl}
        name={user.name}
      />
    </header>
  );
}
