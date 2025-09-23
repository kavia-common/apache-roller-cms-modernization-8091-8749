"use client";

import React, { useId, useState } from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  helpText?: string;
  error?: string;
  asPassword?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "underlined";
};

export default function TextInput({ 
  label, 
  description, 
  helpText,
  error, 
  id, 
  asPassword, 
  leftIcon,
  rightIcon,
  variant = "default",
  className, 
  ...rest 
}: Props) {
  const uid = useId();
  const inputId = id || uid;
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = asPassword || rest.type === "password";
  const type = isPassword ? (show ? "text" : "password") : rest.type || "text";

  const baseInputClasses = "w-full text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-all duration-200";
  
  const variantClasses = {
    default: clsx(
      "rounded-lg border bg-white dark:bg-gray-900 px-3 py-2.5",
      error 
        ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500" 
        : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500"
    ),
    filled: clsx(
      "rounded-lg border-0 bg-gray-100 dark:bg-gray-800 px-3 py-2.5",
      error 
        ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20" 
        : "focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700"
    ),
    underlined: clsx(
      "border-0 border-b-2 bg-transparent px-0 py-2 rounded-none",
      error 
        ? "border-red-400 dark:border-red-500 focus:border-red-500" 
        : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
    )
  };

  const labelClasses = clsx(
    "block text-sm font-medium transition-colors duration-200",
    error 
      ? "text-red-700 dark:text-red-400" 
      : isFocused 
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-800 dark:text-gray-200"
  );

  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {/* Label */}
      <label htmlFor={inputId} className={labelClasses}>
        {label}
        {rest.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      
      {/* Description */}
      {description && (
        <p id={`${inputId}-desc`} className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {leftIcon}
          </div>
        )}
        
        {/* Input */}
        <input
          id={inputId}
          type={type}
          aria-describedby={clsx(
            description && `${inputId}-desc`,
            (helpText || error) && `${inputId}-help`
          )}
          aria-invalid={!!error}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            baseInputClasses,
            variantClasses[variant],
            leftIcon && "pl-10",
            (rightIcon || isPassword) && "pr-10"
          )}
          {...rest}
        />
        
        {/* Right Icon or Password Toggle */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isPassword && (
            <button
              type="button"
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow(s => !s)}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:text-blue-600 dark:focus:text-blue-400"
            >
              {show ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-4.415-4.415m4.415 4.415a3 3 0 014.243 4.243m-4.415-4.415L3.036 3.035m0 0L8.464 8.464M3.036 3.035L8.464 8.464m11.5 11.5l-8.5-8.5" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          )}
          
          {rightIcon && !isPassword && (
            <div className="text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Focus Ring for underlined variant */}
        {variant === "underlined" && isFocused && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform scale-x-100 transition-transform duration-200" />
        )}
      </div>
      
      {/* Help Text or Error */}
      {(helpText || error) && (
        <div id={`${inputId}-help`} className="flex items-start gap-1">
          {error && (
            <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          <p className={clsx(
            "text-xs",
            error ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
          )}>
            {error || helpText}
          </p>
        </div>
      )}
    </div>
  );
}
