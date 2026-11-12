import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      phone,
      address,
      headline,
      summary,
      avatar,
      username,
      template,
      accentColor,
      theme,
      isPublic,
      github,
      linkedin,
      twitter,
      portfolioUrl,
      leetcode,
    } = body;

    // If username slug is changed, check uniqueness
    if (username && username !== user.username) {
      const cleanSlug = username.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
      const existing = await prisma.user.findFirst({
        where: { username: cleanSlug, NOT: { id: user.id } },
      });
      if (existing) {
        return NextResponse.json(
          { error: "This portfolio username/URL is already taken. Please pick another." },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(phone !== undefined && { phone: phone?.trim() || null }),
        ...(address !== undefined && { address: address?.trim() || null }),
        ...(headline !== undefined && { headline: headline?.trim() || null }),
        ...(summary !== undefined && { summary: summary?.trim() || null }),
        ...(avatar !== undefined && { avatar: avatar || null }),
        ...(username !== undefined && {
          username: username.toLowerCase().trim().replace(/[^a-z0-9_-]/g, ""),
        }),
        ...(template !== undefined && { template }),
        ...(accentColor !== undefined && { accentColor }),
        ...(theme !== undefined && { theme }),
        ...(isPublic !== undefined && { isPublic: Boolean(isPublic) }),
        ...(github !== undefined && { github: github?.trim() || null }),
        ...(linkedin !== undefined && { linkedin: linkedin?.trim() || null }),
        ...(twitter !== undefined && { twitter: twitter?.trim() || null }),
        ...(portfolioUrl !== undefined && { portfolioUrl: portfolioUrl?.trim() || null }),
        ...(leetcode !== undefined && { leetcode: leetcode?.trim() || null }),
      },
      include: {
        educations: true,
        skills: true,
        projects: true,
        experiences: true,
        certifications: true,
        achievements: true,
      },
    });

    const { password: _, ...userWithoutPassword } = updated;
    return NextResponse.json({
      message: "Profile updated successfully!",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("PUT /api/profile error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update profile." },
      { status: 500 }
    );
  }
}
