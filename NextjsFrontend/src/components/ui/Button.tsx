"use client";

import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "warning" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  isLoading?: boolean; // alias for loading
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
};

export default function Button({ 
  className, 
  variant = "primary", 
  size = "md",
  loading, 
  isLoading,
  leftIcon,
  rightIcon,
  fullWidth,
  children, 
  disabled,
  ...rest 
}: Props) {
  const isLoadingState = loading || isLoading;
  const isDisabled = disabled || isLoadingState;

  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 transform disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-[1.02] focus-visible:ring-blue-500 active:scale-[0.98]",
    secondary: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md hover:scale-[1.01] focus-visible:ring-gray-500 active:scale-[0.99]",
    ghost: "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01] focus-visible:ring-gray-500 active:scale-[0.99]",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:scale-[1.02] focus-visible:ring-red-500 active:scale-[0.98]",
    success: "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:from-green-700 hover:to-green-800 hover:shadow-xl hover:scale-[1.02] focus-visible:ring-green-500 active:scale-[0.98]",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:scale-[1.02] focus-visible:ring-yellow-500 active:scale-[0.98]",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:scale-[1.01] focus-visible:ring-blue-500 active:scale-[0.99]"
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button 
      className={clsx(
        baseClasses, 
        sizeClasses[size], 
        variantClasses[variant], 
        widthClasses,
        className
      )} 
      disabled={isDisabled}
      aria-busy={isLoadingState}
      {...rest}
    >
      {/* Loading overlay */}
      {isLoadingState && (
        <div className="absolute inset-0 bg-current opacity-10 animate-pulse" />
      )}
      
      {/* Left icon or loading spinner */}
      {isLoadingState ? (
        <svg 
          className="animate-spin h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
      ) : null}
      
      {/* Button text */}
      <span className={clsx(isLoadingState && "opacity-70")}>
        {children}
      </span>
      
      {/* Right icon */}
      {!isLoadingState && rightIcon && (
        <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  );
}
