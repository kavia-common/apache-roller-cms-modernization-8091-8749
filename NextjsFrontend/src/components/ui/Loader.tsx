"use client";

import React from "react";
import clsx from "clsx";

type LoaderVariant = "spinner" | "dots" | "pulse" | "bars" | "ring";
type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl";

interface LoaderProps {
  label?: string;
  variant?: LoaderVariant;
  size?: LoaderSize;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "white";
  centered?: boolean;
  overlay?: boolean;
}

const sizeClasses = {
  xs: "w-3 h-3",
  sm: "w-4 h-4", 
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8"
};

const colorClasses = {
  primary: "text-blue-600 dark:text-blue-400",
  secondary: "text-gray-600 dark:text-gray-400", 
  accent: "text-purple-600 dark:text-purple-400",
  white: "text-white"
};

const SpinnerLoader = ({ size, color }: { size: LoaderSize; color: string }) => (
  <div
    className={clsx(
      sizeClasses[size],
      color,
      "animate-spin rounded-full border-2 border-transparent border-t-current border-r-current"
    )}
    aria-hidden="true"
  />
);

const DotsLoader = ({ size, color }: { size: LoaderSize; color: string }) => (
  <div className="flex items-center gap-1" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={clsx(
          sizeClasses[size],
          color,
          "rounded-full bg-current animate-pulse"
        )}
        style={{
          animationDelay: `${i * 0.2}s`,
          animationDuration: "1s"
        }}
      />
    ))}
  </div>
);

const PulseLoader = ({ size, color }: { size: LoaderSize; color: string }) => (
  <div
    className={clsx(
      sizeClasses[size],
      color,
      "rounded-full bg-current animate-pulse"
    )}
    aria-hidden="true"
  />
);

const BarsLoader = ({ size, color }: { size: LoaderSize; color: string }) => (
  <div className="flex items-end gap-0.5" aria-hidden="true">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={clsx(
          "w-1 bg-current animate-pulse",
          size === "xs" && "h-2",
          size === "sm" && "h-3",
          size === "md" && "h-4", 
          size === "lg" && "h-5",
          size === "xl" && "h-6",
          color
        )}
        style={{
          animationDelay: `${i * 0.15}s`,
          animationDuration: "0.8s"
        }}
      />
    ))}
  </div>
);

const RingLoader = ({ size, color }: { size: LoaderSize; color: string }) => (
  <div className="relative" aria-hidden="true">
    <div
      className={clsx(
        sizeClasses[size],
        "rounded-full border-2 border-gray-200 dark:border-gray-700"
      )}
    />
    <div
      className={clsx(
        sizeClasses[size],
        color,
        "absolute top-0 left-0 rounded-full border-2 border-transparent border-t-current animate-spin"
      )}
    />
  </div>
);

export default function Loader({ 
  label = "Loading...", 
  variant = "spinner",
  size = "md",
  className,
  color = "primary",
  centered = false,
  overlay = false
}: LoaderProps) {
  const colorClass = colorClasses[color];

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <DotsLoader size={size} color={colorClass} />;
      case "pulse":
        return <PulseLoader size={size} color={colorClass} />;
      case "bars":
        return <BarsLoader size={size} color={colorClass} />;
      case "ring":
        return <RingLoader size={size} color={colorClass} />;
      default:
        return <SpinnerLoader size={size} color={colorClass} />;
    }
  };

  const content = (
    <div 
      className={clsx(
        "flex items-center gap-3",
        centered && "justify-center",
        className
      )} 
      role="status" 
      aria-live="polite"
    >
      {renderLoader()}
      {label && (
        <span className={clsx(
          "text-sm font-medium",
          color === "white" ? "text-white" : "text-gray-700 dark:text-gray-300"
        )}>
          {label}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
