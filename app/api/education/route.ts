import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const educations = await prisma.education.findMany({
    where: { userId: user.id },
    orderBy: { startYear: "desc" },
  });
  return NextResponse.json({ educations });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { college, degree, branch, cgpa, startYear, endYear, coursework } = body;

    if (!college || !degree || !startYear || !endYear) {
      return NextResponse.json(
        { error: "College, degree, start year, and graduation year are required." },
        { status: 400 }
      );
    }

    const education = await prisma.education.create({
      data: {
        userId: user.id,
        college: college.trim(),
        degree: degree.trim(),
        branch: branch?.trim() || null,
        cgpa: cgpa?.trim() || null,
        startYear: startYear.trim(),
        endYear: endYear.trim(),
        coursework: coursework?.trim() || null,
      },
    });

    return NextResponse.json({ education }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, college, degree, branch, cgpa, startYear, endYear, coursework } = body;

    if (!id) return NextResponse.json({ error: "Education ID is required" }, { status: 400 });

    const existing = await prisma.education.findFirst({
      where: { id, userId: user.id },
    });
    if (!existing) return NextResponse.json({ error: "Record not found" }, { status: 404 });

    const updated = await prisma.education.update({
      where: { id },
      data: {
        college: college?.trim(),
        degree: degree?.trim(),
        branch: branch?.trim() || null,
        cgpa: cgpa?.trim() || null,
        startYear: startYear?.trim(),
        endYear: endYear?.trim(),
        coursework: coursework?.trim() || null,
      },
    });

    return NextResponse.json({ education: updated });
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

    await prisma.education.deleteMany({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
