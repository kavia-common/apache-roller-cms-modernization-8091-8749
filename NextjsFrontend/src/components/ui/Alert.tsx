"use client";

import React from "react";
import clsx from "clsx";

export default function Alert({
  title,
  children,
  type = "info",
  className,
}: {
  title?: string;
  children?: React.ReactNode;
  type?: "info" | "success" | "warning" | "error";
  className?: string;
}) {
  const styles: Record<string, string> = {
    info: "bg-blue-50 text-blue-900 border-blue-200",
    success: "bg-green-50 text-green-900 border-green-200",
    warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
    error: "bg-red-50 text-red-900 border-red-200",
  };
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={clsx("w-full rounded-md border px-3 py-2 text-sm", styles[type], className)}
    >
      {title && <p className="font-medium mb-1">{title}</p>}
      {children}
    </div>
  );
}
