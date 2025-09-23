"use client";

import React, { useEffect, useMemo, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { BlogAPI } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { push } = useToaster();

  // Autosave draft to localStorage
  useEffect(() => {
    const key = "cms-new-post-draft";
    const saved = window.localStorage.getItem(key);
    if (saved) {
      try {
        const d = JSON.parse(saved) as { title?: string; content?: string; status?: "draft" | "published" };
        setTitle(d.title || "");
        setContent(d.content || "");
        setStatus(d.status || "draft");
      } catch {
        // ignore parse error
      }
    }
  }, []);

  useEffect(() => {
    const key = "cms-new-post-draft";
    const handle = setInterval(() => {
      window.localStorage.setItem(key, JSON.stringify({ title, content, status }));
    }, 1000);
    return () => clearInterval(handle);
  }, [title, content, status]);

  const preview = useMemo(
    () => ({
      title: title || "Untitled Post",
      excerpt: (content || "").slice(0, 240),
      length: (content || "").length,
    }),
    [title, content]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const created = await BlogAPI.create({ title, content, status });
      push({ message: "Post created successfully!", type: "success" });
      window.localStorage.removeItem("cms-new-post-draft");
      window.location.href = `/blogs/${created.id}`;
    } catch (err) {
      const e = err as { message?: string };
      setError(e?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Create Post</h1>
      {error && <Alert type="error" title="Error">{error}</Alert>}
      <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-2">
        <div className="grid gap-4">
          <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
          <TextArea label="Content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your content..." required />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus((e.target.value as "draft") || "published")}
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ]}
          />
          <div className="flex gap-3">
            <Button type="submit" loading={loading}>Save</Button>
            <Button type="button" variant="secondary" onClick={() => { setTitle(""); setContent(""); setStatus("draft"); }}>
              Reset
            </Button>
          </div>
        </div>

        <aside className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-lg font-medium text-gray-900">Live Preview</h2>
          <div className="rounded border border-gray-200 bg-gray-50 p-3">
            <h3 className="text-base font-semibold">{preview.title}</h3>
            <p className="text-sm text-gray-600">{preview.excerpt}{preview.length > 240 ? "…" : ""}</p>
          </div>
        </aside>
      </form>
    </div>
  );
}
