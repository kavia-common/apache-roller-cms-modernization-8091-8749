"use client";

import React, { useEffect, useState } from "react";
import { Notification, NotificationsAPI } from "@/lib/api";
import Loader from "@/components/ui/Loader";
import Alert from "@/components/ui/Alert";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    NotificationsAPI.list()
      .then((d) => setItems(d))
      .catch((e) => setError(e?.message || "Failed to load notifications"));
  }, []);

  if (error) return <Alert type="error" title="Error">{error}</Alert>;
  if (!items) return <Loader label="Loading notifications" />;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
      {items.length === 0 ? (
        <p className="text-sm text-gray-600">No notifications yet.</p>
      ) : (
        <ul className="grid gap-3">
          {items.map((n) => (
            <li key={n.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900">{n.message}</p>
                <span className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
