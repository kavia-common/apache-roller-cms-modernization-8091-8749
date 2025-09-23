"use client";

import React, { useId, useState } from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  error?: string;
  asPassword?: boolean;
};

export default function TextInput({ label, description, error, id, asPassword, className, ...rest }: Props) {
  const uid = useId();
  const inputId = id || uid;
  const [show, setShow] = useState(false);
  const isPassword = asPassword || rest.type === "password";
  const type = isPassword ? (show ? "text" : "password") : rest.type || "text";
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
      <div className="relative">
        <input
          id={inputId}
          aria-describedby={description ? `${inputId}-desc` : undefined}
          aria-invalid={!!error}
          className={clsx(
            "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
            error && "border-red-400 focus:ring-red-500"
          )}
          {...rest}
          type={type}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-700 hover:underline"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
