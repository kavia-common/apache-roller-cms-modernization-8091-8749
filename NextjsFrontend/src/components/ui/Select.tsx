"use client";

import React, { useId } from "react";
import clsx from "clsx";

type Option = { label: string; value: string; disabled?: boolean };
type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  description?: string;
  error?: string;
  helpText?: string;
  placeholder?: string;
};

export default function Select({ 
  label, 
  options, 
  description, 
  error, 
  id, 
  className,
  helpText,
  placeholder,
  disabled,
  ...rest 
}: Props) {
  const uid = useId();
  const selectId = id || uid;

  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {/* Label */}
      <label 
        htmlFor={selectId} 
        className={clsx(
          "text-sm font-medium transition-colors duration-200",
          error ? "text-red-700 dark:text-red-400" : "text-gray-800 dark:text-gray-200",
          disabled && "opacity-60"
        )}
      >
        {label}
      </label>

      {/* Description */}
      {description && (
        <p 
          id={`${selectId}-desc`} 
          className="text-xs text-gray-600 dark:text-gray-400"
        >
          {description}
        </p>
      )}

      {/* Select Container */}
      <div className="relative">
        <select
          id={selectId}
          aria-describedby={description ? `${selectId}-desc` : undefined}
          aria-invalid={!!error}
          className={clsx(
            // Base styles
            "w-full",
            "appearance-none",
            "rounded-lg",
            "border",
            "bg-white",
            "px-3",
            "py-2.5",
            "pr-10",
            "text-sm",
            "text-gray-900",
            "transition-all",
            "duration-200",
            "ease-in-out",
            "focus:outline-none",
            "cursor-pointer",
            
            // Normal state
            "border-gray-300",
            "focus:border-blue-500",
            "focus:ring-2",
            "focus:ring-blue-500/20",
            
            // Dark mode
            "dark:bg-gray-900",
            "dark:border-gray-700",
            "dark:text-gray-100",
            "dark:focus:border-blue-400",
            "dark:focus:ring-blue-400/20",
            
            // Disabled state
            "disabled:opacity-60",
            "disabled:cursor-not-allowed",
            "disabled:bg-gray-50",
            "dark:disabled:bg-gray-900/50",
            
            // Error state
            error && [
              "border-red-400",
              "focus:border-red-500",
              "focus:ring-red-500/20",
              "dark:border-red-500",
              "dark:focus:border-red-400",
              "dark:focus:ring-red-400/20"
            ]
          )}
          disabled={disabled}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
              className="py-2"
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className={clsx(
              "w-4 h-4 transition-colors duration-200",
              error ? "text-red-400" : "text-gray-400 dark:text-gray-500"
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p 
          role="alert" 
          className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
        >
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}
    </div>
  );
}
