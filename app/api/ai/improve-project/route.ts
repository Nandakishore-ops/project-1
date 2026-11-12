import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { improveProjectDescription } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, rawDescription, technologies, highlights } = body;

    if (!title) {
      return NextResponse.json({ error: "Project title is required." }, { status: 400 });
    }

    const enhanced = await improveProjectDescription({
      title,
      rawDescription: rawDescription || "",
      technologies: technologies || "",
      highlights: highlights || "",
    });

    return NextResponse.json({ enhanced });
  } catch (error: any) {
    console.error("AI Project Improve Error:", error);
    return NextResponse.json({ error: "Failed to enhance project description" }, { status: 500 });
  }
}
