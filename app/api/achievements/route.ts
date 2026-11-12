import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const achievements = await prisma.achievement.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ achievements });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, date, link, category } = body;

    if (!title) {
      return NextResponse.json({ error: "Achievement title is required." }, { status: 400 });
    }

    const achievement = await prisma.achievement.create({
      data: {
        userId: user.id,
        title: title.trim(),
        description: description?.trim() || null,
        date: date?.trim() || null,
        link: link?.trim() || null,
        category: category?.trim() || "Hackathon",
      },
    });

    return NextResponse.json({ achievement }, { status: 201 });
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
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.achievement.deleteMany({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ message: "Achievement removed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
