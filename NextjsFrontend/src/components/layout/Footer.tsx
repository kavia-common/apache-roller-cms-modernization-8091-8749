"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-gray-600">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Modern CMS. All rights reserved.</p>
          <nav aria-label="Footer">
            <ul className="flex items-center gap-4">
              <li>
                <Link className="hover:underline" href="/help">Help</Link>
              </li>
              <li>
                <Link className="hover:underline" href="/docs/developer">Developer Docs</Link>
              </li>
              <li>
                <a className="hover:underline" href="https://nextjs.org" target="_blank" rel="noreferrer">Powered by Next.js</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
