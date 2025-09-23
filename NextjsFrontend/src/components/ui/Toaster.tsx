"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import clsx from "clsx";

type Toast = { id: string; message: string; type?: "info" | "success" | "warning" | "error" };

type ToasterCtx = {
  toasts: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<ToasterCtx>({
  toasts: [],
  push: () => {},
  remove: () => {},
});

/**
 * PUBLIC_INTERFACE
 * useToaster
 * Hook to dispatch ephemeral notifications.
 */
export function useToaster() {
  return useContext(Ctx);
}

/**
 * PUBLIC_INTERFACE
 * ToasterProvider
 * Renders ARIA-friendly, auto-dismiss toasts.
 */
export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (t: Omit<Toast, "id">) =>
    setToasts((prev) => [...prev, { id: crypto.randomUUID(), ...t }]);
  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prev) => prev.slice(1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const styles: Record<string, string> = {
    info: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
  };

  return (
    <Ctx.Provider value={{ toasts, push, remove }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={clsx(
              "w-full max-w-sm rounded-md px-4 py-3 text-white shadow-lg focus:outline-none",
              styles[t.type || "info"]
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium">{t.message}</p>
              <button onClick={() => remove(t.id)} aria-label="Dismiss notification" className="text-white/80 hover:text-white">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
