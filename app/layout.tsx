import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portify – AI-Powered Student Portfolio Builder",
  description:
    "Specially designed for B.Tech students and fresh graduates. Build modern developer portfolios, enhance project descriptions with AI, generate QR codes, and export ATS-ready resumes.",
  keywords: [
    "B.Tech Portfolio",
    "Student Portfolio Builder",
    "Computer Science Resume",
    "Developer Portfolio",
    "Next.js Portfolio Generator",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
