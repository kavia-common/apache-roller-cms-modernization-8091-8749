import { NextResponse } from "next/server";
import { BlogAPI } from "@/lib/api";

/**
 * Handle comment submission and redirect back to post.
 */
export async function POST(req: Request, context: { params: Record<string, string> }) {
  const { params } = context;
  const form = await req.formData();
  const content = String(form.get("content") || "");
  if (!content) {
    return NextResponse.redirect(new URL(`/blogs/${params.id}?error=empty`, req.url), { status: 303 });
  }
  try {
    await BlogAPI.addComment(params.id, content);
  } catch {
    // swallow errors to not break UX; backend may not be fully wired
  }
  return NextResponse.redirect(new URL(`/blogs/${params.id}`, req.url), { status: 303 });
}
