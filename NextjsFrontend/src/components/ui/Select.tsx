"use client";

import React, { useId } from "react";
import clsx from "clsx";

type Option = { label: string; value: string };
type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  description?: string;
  error?: string;
};

export default function Select({ label, options, description, error, id, className, ...rest }: Props) {
  const uid = useId();
  const selectId = id || uid;
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <label htmlFor={selectId} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      {description && (
        <p id={`${selectId}-desc`} className="text-xs text-gray-500">
          {description}
        </p>
      )}
      <select
        id={selectId}
        aria-describedby={description ? `${selectId}-desc` : undefined}
        aria-invalid={!!error}
        className={clsx(
          "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
          error && "border-red-400 focus:ring-red-500"
        )}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
