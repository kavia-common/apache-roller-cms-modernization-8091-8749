"use client";

import React, { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { AuthAPI } from "@/lib/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await AuthAPI.login(username, password);
      window.location.href = "/";
    } catch (e) {
      const err = e as { message?: string };
      setError(err?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Login</h1>
      {error && <Alert type="error" title="Login failed">{error}</Alert>}
      <form onSubmit={onSubmit} className="grid gap-4">
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextInput label="Password" asPassword value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" loading={loading}>Login</Button>
      </form>
    </div>
  );
}
