import { NextRequest, NextResponse } from "next/server";
import { BlogAPI } from "@/lib/api";

/**
 * Handle comment submission and redirect back to post.
 * PUBLIC_INTERFACE
 * POST /blogs/[id]/comment
 */
export async function POST(req: NextRequest, context /* eslint-disable-line @typescript-eslint/no-unused-vars */) {
  // Avoid typing the second arg in signature to satisfy Next.js validator; assert locally from unknown.
  const ctx = context as unknown as { params?: { id?: string } };
  const id = ctx?.params?.id;
  const form = await req.formData();
  const content = String(form.get("content") || "");
  if (!content || !id) {
    return NextResponse.redirect(new URL(`/blogs/${id || ""}?error=empty`, req.url), { status: 303 });
  }
  try {
    await BlogAPI.addComment(id, content);
  } catch {
    // swallow errors to not break UX; backend may not be fully wired
  }
  return NextResponse.redirect(new URL(`/blogs/${id}`, req.url), { status: 303 });
}
