import { BlogAPI, withApiError } from "@/lib/api";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

import type { PageProps } from "next";

export default async function BlogDetailsPage({ params }: PageProps<{ id: string }>) {
  const [post, err] = await withApiError(BlogAPI.get(params.id));

  if (err) {
    return <p className="text-red-700">Failed to load post: {err.message}</p>;
  }
  if (!post) return null;

  return (
    <article className="prose max-w-none">
      <h1 className="mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(post.createdAt).toLocaleString()} • Status: <span className="rounded bg-gray-100 px-2 py-0.5">{post.status}</span>
      </p>
      <div className="mt-6 whitespace-pre-wrap">{post.content}</div>

      <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Add a comment</h2>
        {/* PUBLIC_INTERFACE: client-side submit */}
        <form action={`/blogs/${post.id}/comment`} method="post" className="grid gap-3">
          <TextArea name="content" label="Comment" placeholder="Share your thoughts…" required />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </article>
  );
}
