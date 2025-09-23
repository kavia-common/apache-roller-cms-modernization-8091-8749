"use client";

import React, { useId } from "react";
import clsx from "clsx";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  description?: string;
  error?: string;
};

export default function TextArea({ label, description, error, id, className, ...rest }: Props) {
  const uid = useId();
  const inputId = id || uid;
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      {description && (
        <p id={`${inputId}-desc`} className="text-xs text-gray-500">
          {description}
        </p>
      )}
      <textarea
        id={inputId}
        aria-describedby={description ? `${inputId}-desc` : undefined}
        aria-invalid={!!error}
        className={clsx(
          "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-28",
          error && "border-red-400 focus:ring-red-500"
        )}
        {...rest}
      />
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
