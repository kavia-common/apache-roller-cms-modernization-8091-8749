import { BlogAPI, BlogPost, withApiError } from "@/lib/api";
import Link from "next/link";

export const revalidate = 30;

import type { PageProps } from "next";

export default async function BlogsPage({ searchParams }: PageProps<unknown, { status?: string }>) {
  const status = searchParams?.status || "published";
  const [posts, err] = await withApiError(BlogAPI.list({ status, limit: 20 }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Blogs</h1>
        <Link
          href="/blogs/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Create Post
        </Link>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-gray-600">Filter:</span>
        {["draft", "published", "archived"].map((s) => (
          <Link
            key={s}
            href={`/blogs?status=${s}`}
            className={`rounded px-2 py-1 ${status === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
          >
            {s}
          </Link>
        ))}
      </div>

      {err && <p className="text-red-700">Failed to load posts: {err.message}</p>}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(posts || []).map((p: BlogPost) => (
          <li key={p.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <Link href={`/blogs/${p.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <h2 className="mb-1 line-clamp-1 text-lg font-medium text-gray-900">{p.title}</h2>
              <p className="mb-2 line-clamp-2 text-sm text-gray-600">{p.content.replace(/<[^>]*>?/gm, "").slice(0, 160)}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                <span className="rounded bg-gray-100 px-2 py-0.5">{p.status}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
