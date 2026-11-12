import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PortfolioRenderer } from "@/components/templates/PortfolioRenderer";
import { UserX, Sparkles, ArrowRight, Lock } from "lucide-react";

interface Props {
  params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    select: { name: true, headline: true, summary: true, avatar: true },
  });

  if (!user) {
    return {
      title: "Portfolio Not Found | Portify",
      description: "The requested student portfolio could not be found.",
    };
  }

  return {
    title: `${user.name} – B.Tech Portfolio | Portify`,
    description: user.headline || user.summary || `Professional portfolio of ${user.name}`,
    openGraph: {
      title: `${user.name} – Student Portfolio`,
      description: user.headline || `Explore ${user.name}'s engineering projects, education, and skills.`,
      images: user.avatar ? [user.avatar] : [],
    },
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      educations: { orderBy: { startYear: "desc" } },
      skills: { orderBy: { category: "asc" } },
      projects: { orderBy: { createdAt: "desc" } },
      experiences: { orderBy: { startDate: "desc" } },
      certifications: { orderBy: { createdAt: "desc" } },
      achievements: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-indigo-400 mb-4 shadow-xl">
          <UserX className="w-12 h-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Portfolio Not Found</h1>
        <p className="text-slate-400 max-w-md mt-2 text-sm sm:text-base">
          No student portfolio exists at <code className="text-indigo-400">/p/{params.username}</code>.
          The user may have updated their URL or unpublished it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-lg"
          >
            <Sparkles className="w-4 h-4" /> Build Your Own Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!user.isPublic) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 mb-4 shadow-xl">
          <Lock className="w-12 h-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">{user.name}&apos;s Portfolio</h1>
        <p className="text-slate-400 max-w-md mt-2 text-sm sm:text-base">
          This portfolio is currently set to private mode by the student.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-indigo-400 hover:underline"
        >
          Return to Portify Home <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return <PortfolioRenderer user={user} isPublicView={true} />;
}
