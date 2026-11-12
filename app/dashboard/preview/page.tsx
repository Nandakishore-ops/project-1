"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Tablet,
  Monitor,
  QrCode,
  Share2,
  Check,
  ExternalLink,
  Loader2,
  RefreshCw,
  Palette,
} from "lucide-react";
import { PortfolioRenderer } from "@/components/templates/PortfolioRenderer";
import { QRCodeModal } from "@/components/templates/QRCodeModal";
import { PDFDownloadButton } from "@/components/templates/PDFDownloadButton";

export default function PreviewPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.user) setUser(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm">Rendering live preview...</p>
      </div>
    );
  }

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p/${user.username}`
    : `https://portify.dev/p/${user.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deviceWidthClass = {
    desktop: "w-full max-w-full",
    tablet: "w-[768px] mx-auto shadow-2xl rounded-3xl border-4 border-slate-800 overflow-hidden my-4",
    mobile: "w-[390px] mx-auto shadow-2xl rounded-3xl border-4 border-slate-800 overflow-hidden my-4",
  }[device];

  return (
    <div className="space-y-6">
      {/* Top Preview Controls Toolbar */}
      <div className="sticky top-[61px] z-30 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Device Viewport switch */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              device === "desktop" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              device === "tablet" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              device === "mobile" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUserData}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh Live Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            href="/dashboard/templates"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            title="Change Template"
          >
            <Palette className="w-4 h-4" />
            <span>Template</span>
          </Link>

          <button
            onClick={() => setShowQR(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">QR Code</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>

          <PDFDownloadButton studentName={user.name} />

          <a
            href={`/p/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            title="Open Public Link"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-3xl p-2 sm:p-4 min-h-[800px] overflow-x-auto">
        <div className={`${deviceWidthClass} transition-all duration-300`}>
          <PortfolioRenderer user={user} isPublicView={false} />
        </div>
      </div>

      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        url={publicUrl}
        name={user.name}
      />
    </div>
  );
}
