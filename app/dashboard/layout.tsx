import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { calculateCompleteness } from "@/lib/utils";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const completeness = calculateCompleteness(user);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <DashboardNav user={user} completenessScore={completeness.score} />

      <div className="flex-1 flex">
        <Sidebar user={user} />
        <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
