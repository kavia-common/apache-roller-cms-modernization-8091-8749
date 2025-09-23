"use client";

import React from "react";

export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-2" role="status" aria-live="polite">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" aria-hidden />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}
