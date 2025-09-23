import { HealthAPI, withApiError } from "@/lib/api";
import Link from "next/link";

export const revalidate = 60; // ISR for health widget

export default async function Home() {
  const [health] = await withApiError(HealthAPI.get());

  return (
    <div className="grid gap-8">
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Welcome to Modern CMS</h1>
        <p className="text-gray-600">
          A Next.js frontend for the modernized Apache Roller platform: accessible, secure, and customizable.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Browse Blogs", desc: "Read published posts", href: "/blogs" },
          { title: "Create Post", desc: "Author new content", href: "/blogs/new" },
          { title: "Themes", desc: "Switch and customize themes", href: "/themes" },
          { title: "Notifications", desc: "See recent alerts", href: "/notifications" },
          { title: "Profile", desc: "Manage your profile", href: "/profile" },
          { title: "Admin", desc: "Moderation & users", href: "/admin" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={c.title}
          >
            <h2 className="mb-1 text-lg font-medium text-gray-900">{c.title}</h2>
            <p className="text-sm text-gray-600">{c.desc}</p>
          </Link>
        ))}
      </section>

      <section aria-labelledby="system-health" className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 id="system-health" className="mb-2 text-lg font-medium text-gray-900">
          System Health
        </h2>
        {health ? (
          <p className="text-sm text-gray-700">
            Status: <span className="font-medium">{(health && (health as { status?: string }).status) || "ok"}</span>{" "}
            {health?.timestamp ? `@ ${new Date(health.timestamp).toLocaleString()}` : ""}
          </p>
        ) : (
          <p className="text-sm text-red-700">Health check unavailable.</p>
        )}
      </section>
    </div>
  );
}
