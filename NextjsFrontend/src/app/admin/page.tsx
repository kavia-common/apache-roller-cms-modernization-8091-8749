"use client";

import React, { useEffect, useState } from "react";
import { UsersAPI, User } from "@/lib/api";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({ username: "", email: "" });

  const load = () =>
    UsersAPI.list()
      .then((u) => setUsers(u))
      .catch((e) => setError((e as { message?: string })?.message || "Failed to load users"));

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      await UsersAPI.create(newUser);
      setNewUser({ username: "", email: "" });
      await load();
    } catch (e) {
      const err = e as { message?: string };
      setError(err?.message || "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      {error && <Alert type="error" title="Error">{error}</Alert>}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-medium">Users</h2>
        <ul className="grid gap-3">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{u.username}</p>
                <p className="text-xs text-gray-600">{u.email}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => UsersAPI.update(u.id, { role: "user" as unknown as User["role"] })}
                >
                  Demote
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => UsersAPI.update(u.id, { role: "admin" as unknown as User["role"] })}
                >
                  Promote
                </Button>
                <Button variant="danger" onClick={() => UsersAPI.remove(u.id).then(load)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={onCreate} className="mt-4 grid max-w-md gap-3">
          <TextInput label="Username" value={newUser.username || ""} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required />
          <TextInput label="Email" type="email" value={newUser.email || ""} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
          <Button type="submit" loading={creating}>Create user</Button>
        </form>
      </section>
    </div>
  );
}
