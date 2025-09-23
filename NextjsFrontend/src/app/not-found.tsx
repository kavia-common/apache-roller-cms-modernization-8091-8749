import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm" role="alert" aria-live="assertive">
      <h1 className="mb-2 text-2xl font-semibold text-gray-900">404 – Page Not Found</h1>
      <p className="mb-6 text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        Go Home
      </Link>
    </section>
  );
}
