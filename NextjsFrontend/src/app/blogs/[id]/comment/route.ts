import { NextRequest, NextResponse, type RouteContext } from "next/server";
import { BlogAPI } from "@/lib/api";

/**
 * Handle comment submission and redirect back to post.
 * PUBLIC_INTERFACE
 * POST /blogs/[id]/comment
 */
export async function POST(
  req: NextRequest,
  context: RouteContext<{ id: string }>
) {
  const id = context?.params?.id;
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
