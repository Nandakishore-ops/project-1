import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const { imageBase64 } = await req.json();
      if (!imageBase64 || !imageBase64.startsWith("data:image/")) {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
      }

      // Check size (rough check ~5MB max)
      if (imageBase64.length > 7 * 1024 * 1024) {
        return NextResponse.json({ error: "Image file too large (max 5MB)" }, { status: 400 });
      }

      // If Supabase Storage is configured in env, can upload to Supabase bucket
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        try {
          const match = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (match) {
            const mime = match[1];
            const buffer = Buffer.from(match[2], "base64");
            const ext = mime.split("/")[1] || "jpg";
            const filename = `avatar-${user.id}-${Date.now()}.${ext}`;

            const uploadRes = await fetch(
              `${supabaseUrl}/storage/v1/object/portfolios/${filename}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${supabaseKey}`,
                  "Content-Type": mime,
                },
                body: buffer,
              }
            );

            if (uploadRes.ok) {
              const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolios/${filename}`;
              return NextResponse.json({ url: publicUrl });
            }
          }
        } catch (supabaseErr) {
          console.warn("Supabase upload failed, using optimized base64:", supabaseErr);
        }
      }

      // Return base64 URL directly
      return NextResponse.json({ url: imageBase64 });
    }

    return NextResponse.json({ error: "Unsupported media format" }, { status: 400 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
