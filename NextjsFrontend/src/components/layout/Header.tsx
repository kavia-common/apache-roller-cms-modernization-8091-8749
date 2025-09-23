"use client";

import React from "react";
import Link from "next/link";
import { NAV_ITEMS, Role, useThemeSettings } from "@/lib/theme";
import clsx from "clsx";

export default function Header({ role = "guest" }: { role?: Role }) {
  const { toggleMode, settings } = useThemeSettings();

  const visibleNav = NAV_ITEMS.filter((n) => !n.roles || n.roles.includes(role));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div aria-hidden className="h-7 w-7 rounded bg-blue-600" />
          <span className="text-lg font-semibold text-gray-900">Modern CMS</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-4">
            {visibleNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className={clsx(
                    "rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMode}
            className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Switch to ${settings.mode === "light" ? "dark" : "light"} mode`}
          >
            {settings.mode === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
