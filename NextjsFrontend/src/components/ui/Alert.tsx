"use client";

import React from "react";
import clsx from "clsx";

const AlertIcons = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  )
};

export default function Alert({
  title,
  children,
  type = "info",
  className,
  dismissible = false,
  onDismiss,
  animate = true,
}: {
  title?: string;
  children?: React.ReactNode;
  type?: "info" | "success" | "warning" | "error";
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  animate?: boolean;
}) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    if (animate) {
      setIsVisible(false);
      setTimeout(() => {
        onDismiss?.();
      }, 150);
    } else {
      onDismiss?.();
    }
  };

  const baseClasses = [
    "relative",
    "w-full",
    "rounded-lg",
    "border",
    "p-4",
    "shadow-sm",
    "transition-all",
    "duration-200",
    "ease-in-out"
  ];

  const typeStyles = {
    info: [
      "bg-blue-50",
      "text-blue-900",
      "border-blue-200",
      "dark:bg-blue-900/20",
      "dark:text-blue-100",
      "dark:border-blue-800"
    ],
    success: [
      "bg-green-50", 
      "text-green-900",
      "border-green-200",
      "dark:bg-green-900/20",
      "dark:text-green-100", 
      "dark:border-green-800"
    ],
    warning: [
      "bg-yellow-50",
      "text-yellow-900", 
      "border-yellow-200",
      "dark:bg-yellow-900/20",
      "dark:text-yellow-100",
      "dark:border-yellow-800"
    ],
    error: [
      "bg-red-50",
      "text-red-900",
      "border-red-200", 
      "dark:bg-red-900/20",
      "dark:text-red-100",
      "dark:border-red-800"
    ],
  };

  const iconColorStyles = {
    info: "text-blue-500 dark:text-blue-400",
    success: "text-green-500 dark:text-green-400", 
    warning: "text-yellow-500 dark:text-yellow-400",
    error: "text-red-500 dark:text-red-400",
  };

  if (!isVisible && animate) {
    return null;
  }

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className={clsx(
        baseClasses,
        typeStyles[type],
        animate && "animate-fade-in",
        !isVisible && animate && "opacity-0 scale-95",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={clsx("flex-shrink-0 mt-0.5", iconColorStyles[type])}>
          {AlertIcons[type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-sm font-semibold mb-1">
              {title}
            </h3>
          )}
          
          {children && (
            <div className="text-sm leading-relaxed">
              {children}
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={clsx(
              "flex-shrink-0",
              "ml-2",
              "inline-flex",
              "rounded-md",
              "p-1.5",
              "transition-colors",
              "duration-200",
              "hover:bg-black/5",
              "dark:hover:bg-white/10",
              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-offset-2",
              iconColorStyles[type],
              "focus-visible:ring-current"
            )}
            aria-label="Dismiss alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
