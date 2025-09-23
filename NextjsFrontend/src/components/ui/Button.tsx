"use client";

import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
};

export default function Button({ className, variant = "primary", loading, children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
  const styles: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  };
  return (
    <button className={clsx(base, styles[variant], className)} aria-busy={loading} {...rest}>
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" aria-hidden />
      )}
      <span>{children}</span>
    </button>
  );
}
