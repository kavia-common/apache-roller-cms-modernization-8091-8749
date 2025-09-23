"use client";

import React, { useEffect, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { AuthAPI, Profile } from "@/lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({ displayName: "", bio: "", avatarUrl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    AuthAPI.me()
      .then((p) => setProfile(p || {}))
      .catch((e) => setError(e?.message || "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await AuthAPI.updateProfile(profile);
      setSaved(true);
    } catch (e) {
      const err = e as { message?: string };
      setError(err?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile…</p>;

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Profile</h1>
      {error && <Alert type="error" title="Error">{error}</Alert>}
      {saved && <Alert type="success">Profile updated</Alert>}
      <form onSubmit={save} className="grid gap-4">
        <TextInput label="Display Name" value={profile.displayName || ""} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} />
        <TextArea label="Bio" value={profile.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        <TextInput label="Avatar URL" value={profile.avatarUrl || ""} onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })} />
        <Button type="submit" loading={saving}>Save</Button>
      </form>
    </div>
  );
}
