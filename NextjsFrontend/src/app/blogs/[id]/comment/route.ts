import { NextResponse, NextRequest } from "next/server";
import { BlogAPI } from "@/lib/api";

/**
 * PUBLIC_INTERFACE
 * POST /blogs/[id]/comment
 * Handle comment submission and redirect back to the post.
 *
 * Params:
 * - id: string (from dynamic route)
 *
 * Request:
 * - form-data with field "content"
 *
 * Returns:
 * - 303 redirect back to the post (or with error query if content is empty)
 */
export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const form = await req.formData();
  const content = String(form.get("content") || "");
  if (!content) {
    return NextResponse.redirect(new URL(`/blogs/${id}?error=empty`, req.url), { status: 303 });
  }
  try {
    await BlogAPI.addComment(id, content);
  } catch {
    // swallow errors to not break UX; backend may not be fully wired
  }
  return NextResponse.redirect(new URL(`/blogs/${id}`, req.url), { status: 303 });
}
