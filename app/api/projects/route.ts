import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, technologies, githubUrl, liveUrl, featured, highlights } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Project title and description are required." },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        title: title.trim(),
        description: description.trim(),
        technologies: technologies?.trim() || "Web Development",
        githubUrl: githubUrl?.trim() || null,
        liveUrl: liveUrl?.trim() || null,
        featured: Boolean(featured),
        highlights: highlights?.trim() || null,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, title, description, technologies, githubUrl, liveUrl, featured, highlights } = body;

    if (!id) return NextResponse.json({ error: "Project ID is required" }, { status: 400 });

    const existing = await prisma.project.findFirst({
      where: { id, userId: user.id },
    });
    if (!existing) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: title?.trim(),
        description: description?.trim(),
        technologies: technologies?.trim(),
        githubUrl: githubUrl?.trim() || null,
        liveUrl: liveUrl?.trim() || null,
        featured: Boolean(featured),
        highlights: highlights?.trim() || null,
      },
    });

    return NextResponse.json({ project: updated });
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
    if (!id) return NextResponse.json({ error: "Project ID required" }, { status: 400 });

    await prisma.project.deleteMany({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
