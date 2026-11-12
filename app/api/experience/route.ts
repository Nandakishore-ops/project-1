import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const experiences = await prisma.experience.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ experiences });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { role, company, location, type = "Internship", startDate, endDate, description, technologies } = body;

    if (!role || !company || !startDate) {
      return NextResponse.json(
        { error: "Role, company name, and start date are required." },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        userId: user.id,
        role: role.trim(),
        company: company.trim(),
        location: location?.trim() || null,
        type,
        startDate: startDate.trim(),
        endDate: endDate?.trim() || "Present",
        description: description?.trim() || null,
        technologies: technologies?.trim() || null,
      },
    });

    return NextResponse.json({ experience }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, role, company, location, type, startDate, endDate, description, technologies } = body;

    if (!id) return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });

    const existing = await prisma.experience.findFirst({
      where: { id, userId: user.id },
    });
    if (!existing) return NextResponse.json({ error: "Record not found" }, { status: 404 });

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        role: role?.trim(),
        company: company?.trim(),
        location: location?.trim() || null,
        type: type || "Internship",
        startDate: startDate?.trim(),
        endDate: endDate?.trim() || "Present",
        description: description?.trim() || null,
        technologies: technologies?.trim() || null,
      },
    });

    return NextResponse.json({ experience: updated });
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

    await prisma.experience.deleteMany({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ message: "Experience deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
