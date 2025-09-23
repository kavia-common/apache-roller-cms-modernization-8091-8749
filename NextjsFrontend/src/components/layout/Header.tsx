"use client";

import React from "react";
import Link from "next/link";
import { NAV_ITEMS, Role, useThemeSettings } from "@/lib/theme";
import clsx from "clsx";

export default function Header({ role = "guest" }: { role?: Role }) {
  const { toggleMode, settings } = useThemeSettings();

  const visibleNav = NAV_ITEMS.filter((n) => !n.roles || n.roles.includes(role));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:border-gray-800/70 dark:bg-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-900/60 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo and Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 -m-1"
        >
          <div 
            aria-hidden 
            className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Modern CMS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {visibleNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className={clsx(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100",
                    "hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    "active:scale-95"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
          aria-label="Open mobile menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleMode}
            className={clsx(
              "relative p-2.5 rounded-xl transition-all duration-300 group",
              "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              "active:scale-95"
            )}
            aria-label={`Switch to ${settings.mode === "light" ? "dark" : "light"} mode`}
          >
            {/* Sun Icon */}
            <svg 
              className={clsx(
                "w-5 h-5 transition-all duration-500 absolute inset-2.5",
                settings.mode === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
              )} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
            
            {/* Moon Icon */}
            <svg 
              className={clsx(
                "w-5 h-5 transition-all duration-500 absolute inset-2.5",
                settings.mode === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              )} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          {/* User Menu Placeholder */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            <Link
              href="/login"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay (hidden by default, would need state management) */}
      <div className="hidden md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <nav aria-label="Mobile navigation" className="px-4 py-4">
          <ul className="space-y-2">
            {visibleNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  className="w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-center"
                >
                  Sign Up
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
