"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";

interface PDFDownloadButtonProps {
  studentName: string;
  className?: string;
}

export function PDFDownloadButton({ studentName, className }: PDFDownloadButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    setIsExporting(true);
    // Set document title temporarily to student name for the PDF filename
    const originalTitle = document.title;
    document.title = `${studentName.replace(/\s+/g, "_")}_Portify_Resume`;

    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setIsExporting(false);
    }, 300);
  };

  return (
    <button
      onClick={handlePrint}
      disabled={isExporting}
      title="Export portfolio as PDF / Resume"
      className={
        className ||
        "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
      }
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Preparing PDF...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" /> Download Resume / PDF
        </>
      )}
    </button>
  );
}
