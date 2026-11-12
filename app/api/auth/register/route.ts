import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, getAuthCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      phone,
      address,
      college,
      degree = "B.Tech",
      branch,
      cgpa,
      graduationYear,
      avatar,
      headline,
      summary,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Check if email already registered
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Generate unique slug for public portfolio URL
    let baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!baseSlug) baseSlug = "student";

    let username = baseSlug;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseSlug}-${counter++}`;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        avatar: avatar || null,
        username,
        headline: headline?.trim() || `${degree} in ${branch || "Computer Science"} | Aspiring Software Engineer`,
        summary: summary?.trim() || null,
        template: "modern-developer",
        accentColor: "indigo",
        theme: "dark",
        isPublic: true,
        educations: college
          ? {
              create: [
                {
                  college: college.trim(),
                  degree: degree.trim(),
                  branch: branch?.trim() || "Computer Science and Engineering",
                  cgpa: cgpa?.trim() || null,
                  startYear: (new Date().getFullYear() - 3).toString(),
                  endYear: graduationYear?.trim() || (new Date().getFullYear() + 1).toString(),
                  coursework: "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks",
                },
              ],
            }
          : undefined,
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

    const token = signToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    const response = NextResponse.json(
      {
        message: "Registration successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          headline: user.headline,
          avatar: user.avatar,
        },
      },
      { status: 201 }
    );

    const cookieOptions = getAuthCookieOptions();
    response.cookies.set(cookieOptions.name, token, cookieOptions);

    return response;
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register account." },
      { status: 500 }
    );
  }
}
