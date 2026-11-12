import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { generateHeadlines } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const degree = body.degree || user.educations?.[0]?.degree || "B.Tech";
    const branch = body.branch || user.educations?.[0]?.branch || "Computer Science";
    const college = body.college || user.educations?.[0]?.college || "";
    const skills = body.skills || user.skills?.map((s) => s.name) || [];
    const targetRole = body.targetRole || "Software Development Engineer (SDE)";

    const headlines = await generateHeadlines({
      name: user.name,
      degree,
      branch,
      college,
      skills,
      targetRole,
    });

    return NextResponse.json({ headlines });
  } catch (error: any) {
    console.error("AI Headline Error:", error);
    return NextResponse.json({ error: "Failed to generate AI headlines" }, { status: 500 });
  }
}
