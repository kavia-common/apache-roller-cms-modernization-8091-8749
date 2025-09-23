"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import clsx from "clsx";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  description?: string;
  helpText?: string;
  error?: string;
  variant?: "default" | "filled";
  autoResize?: boolean;
  maxHeight?: number;
};

export default function TextArea({ 
  label, 
  description, 
  helpText,
  error, 
  id, 
  variant = "default",
  autoResize = false,
  maxHeight = 300,
  className, 
  onChange,
  ...rest 
}: Props) {
  const uid = useId();
  const inputId = id || uid;
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      const adjustHeight = () => {
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;
      };
      
      adjustHeight();
      textarea.addEventListener('input', adjustHeight);
      
      return () => textarea.removeEventListener('input', adjustHeight);
    }
  }, [autoResize, maxHeight, rest.value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    
    // Trigger resize on value change if auto-resize is enabled
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const baseClasses = "w-full text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-all duration-200 resize-none";
  
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
      
      {/* Textarea Container */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          id={inputId}
          aria-describedby={clsx(
            description && `${inputId}-desc`,
            (helpText || error) && `${inputId}-help`
          )}
          aria-invalid={!!error}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          className={clsx(
            baseClasses,
            variantClasses[variant],
            autoResize ? "overflow-hidden" : "min-h-28",
            !autoResize && rest.rows === undefined && "min-h-28"
          )}
          style={autoResize ? { maxHeight: `${maxHeight}px` } : undefined}
          {...rest}
        />
        
        {/* Character count indicator */}
        {rest.maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 px-1 rounded">
            {String(rest.value || '').length}/{rest.maxLength}
          </div>
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
