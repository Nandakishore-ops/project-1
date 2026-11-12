import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { generateSummary } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));

    const primaryEdu = user.educations?.[0];
    const degree = body.degree || primaryEdu?.degree || "B.Tech";
    const branch = body.branch || primaryEdu?.branch || "Computer Science & Engineering";
    const college = body.college || primaryEdu?.college || "Engineering College";
    const cgpa = body.cgpa || primaryEdu?.cgpa || "";
    const graduationYear = body.graduationYear || primaryEdu?.endYear || "";

    const technicalSkills = user.skills?.filter((s) => s.category === "technical").map((s) => s.name) || [];
    const programmingLanguages = user.skills?.filter((s) => s.category === "languages").map((s) => s.name) || [];
    const softSkills = user.skills?.filter((s) => s.category === "soft").map((s) => s.name) || [];

    const summaries = await generateSummary({
      name: user.name,
      degree,
      branch,
      college,
      cgpa,
      graduationYear,
      technicalSkills: technicalSkills.length > 0 ? technicalSkills : body.technicalSkills,
      programmingLanguages: programmingLanguages.length > 0 ? programmingLanguages : body.programmingLanguages,
      softSkills: softSkills.length > 0 ? softSkills : body.softSkills,
      projects: user.projects?.map((p) => ({ title: p.title, technologies: p.technologies })),
      experiences: user.experiences?.map((e) => ({ role: e.role, company: e.company })),
      careerGoal: body.careerGoal,
    });

    return NextResponse.json({ summaries });
  } catch (error: any) {
    console.error("AI Summary Error:", error);
    return NextResponse.json({ error: "Failed to generate professional summary" }, { status: 500 });
  }
}
