import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const certifications = await prisma.certification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ certifications });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, issuer, issueDate, credentialUrl } = body;

    if (!name || !issuer) {
      return NextResponse.json(
        { error: "Certification name and issuer are required." },
        { status: 400 }
      );
    }

    const certification = await prisma.certification.create({
      data: {
        userId: user.id,
        name: name.trim(),
        issuer: issuer.trim(),
        issueDate: issueDate?.trim() || null,
        credentialUrl: credentialUrl?.trim() || null,
      },
    });

    return NextResponse.json({ certification }, { status: 201 });
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

    await prisma.certification.deleteMany({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ message: "Certification removed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
