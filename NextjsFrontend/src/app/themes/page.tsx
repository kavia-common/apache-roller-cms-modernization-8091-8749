"use client";

import React, { useEffect, useState } from "react";
import { ThemesAPI } from "@/lib/api";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { useThemeSettings } from "@/lib/theme";

export default function ThemesPage() {
  const [themes, setThemes] = useState<{ id: string; name: string }[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { settings, setSettings, toggleMode } = useThemeSettings();
  const [draft, setDraft] = useState(settings);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    ThemesAPI.list()
      .then((t) => setThemes((t as Array<{ id: string; name: string }>)))
      .catch((e) => {
        const err = e as { message?: string };
        setError(err?.message || "Failed to load themes");
      });
  }, []);

  const applyDraft = () => {
    setSettings(draft);
    setDirty(false);
  };
  const rollback = () => {
    setDraft(settings);
    setDirty(false);
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Themes & Customization</h1>
      {error && <Alert type="error" title="Error">{error}</Alert>}

      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-medium">Available Themes</h2>
        {themes.length === 0 ? (
          <p className="text-sm text-gray-600">No themes found.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((t) => (
              <li key={t.id} className="rounded border border-gray-200 bg-gray-50 p-3">
                <p className="font-medium">{t.name}</p>
                <Button className="mt-2" variant="secondary" onClick={() => toggleMode()}>
                  Toggle Mode
                </Button>
              </li>
            ))}
          </ul>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await ThemesAPI.create({ name });
              setName("");
              const list = await ThemesAPI.list();
              setThemes((list as Array<{ id: string; name: string }>));
            } catch (e) {
              const err = e as { message?: string };
              setError(err?.message || "Failed to create theme");
            }
          }}
          className="mt-4 flex items-end gap-3"
        >
          <TextInput label="New theme name" value={name} onChange={(e) => setName(e.target.value)} placeholder="My Theme" />
          <Button type="submit">Create</Button>
        </form>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-medium">Customization Panel (Live Preview)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Primary Text Color"
            value={draft.primary}
            onChange={(e) => {
              setDraft({ ...draft, primary: e.target.value });
              document.documentElement.style.setProperty("--color-primary", e.target.value);
              setDirty(true);
            }}
            placeholder="#111827"
          />
          <TextInput
            label="Background Color"
            value={draft.background}
            onChange={(e) => {
              setDraft({ ...draft, background: e.target.value });
              document.documentElement.style.setProperty("--color-background", e.target.value);
              setDirty(true);
            }}
            placeholder="#ffffff"
          />
          <TextInput
            label="Accent Color"
            value={draft.accent}
            onChange={(e) => {
              setDraft({ ...draft, accent: e.target.value });
              document.documentElement.style.setProperty("--color-accent", e.target.value);
              setDirty(true);
            }}
            placeholder="#3B82F6"
          />
          <TextInput
            label="Custom CSS (URL)"
            description="Optional URL to a CSS file to inject."
            value={draft.customCss || ""}
            onChange={(e) => {
              setDraft({ ...draft, customCss: e.target.value });
              setDirty(true);
            }}
            placeholder="https://cdn.example.com/custom.css"
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button onClick={applyDraft} disabled={!dirty}>Apply</Button>
          <Button variant="secondary" onClick={rollback} disabled={!dirty}>Rollback</Button>
        </div>
      </section>
    </div>
  );
}
