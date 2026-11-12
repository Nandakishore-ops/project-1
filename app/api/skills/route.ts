import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skills = await prisma.skill.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ skills });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // Check if bulk insert
    if (Array.isArray(body.skills)) {
      const skillsToCreate = body.skills
        .filter((s: any) => s.name && s.name.trim())
        .map((s: any) => ({
          userId: user.id,
          name: s.name.trim(),
          category: s.category || "technical",
          level: s.level || "Proficient",
        }));

      if (body.replaceExisting) {
        await prisma.skill.deleteMany({ where: { userId: user.id } });
      }

      await prisma.skill.createMany({
        data: skillsToCreate,
      });

      const updatedSkills = await prisma.skill.findMany({
        where: { userId: user.id },
      });
      return NextResponse.json({ skills: updatedSkills }, { status: 201 });
    }

    const { name, category = "technical", level = "Proficient" } = body;
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
    }

    const skill = await prisma.skill.create({
      data: {
        userId: user.id,
        name: name.trim(),
        category,
        level,
      },
    });

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Skill ID required" }, { status: 400 });

    await prisma.skill.deleteMany({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ message: "Skill removed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
