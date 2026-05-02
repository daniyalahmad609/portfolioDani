"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { deleteRecord, uploadImageToRecord, upsertRecord } from "@/lib/actions/admin";

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" disabled={pending} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold disabled:opacity-50">
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

export function GenericUpsertForm({
  table,
  fields,
  title
}: {
  table: "services" | "projects" | "skills" | "profiles" | "contact";
  fields: {
    name: string;
    label: string;
    defaultValue?: string;
    required?: boolean;
    multiline?: boolean;
    placeholder?: string;
    type?: "text" | "number" | "hidden";
    hidden?: boolean;
  }[];
  title: string;
}) {
  const [pending, start] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{
        table: string;
        field: string;
        mode: "replace" | "append-array";
        recordId: string;
        publicUrl: string;
      }>;
      const detail = customEvent.detail;
      if (!detail || detail.table !== table || !formRef.current) return;

      const idInput = formRef.current.elements.namedItem("id") as HTMLInputElement | null;
      const targetInput = formRef.current.elements.namedItem(detail.field) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!idInput || !targetInput) return;

      // Auto-attach upload result to the active record in the form.
      if (!idInput.value) {
        idInput.value = detail.recordId;
      }
      if (idInput.value !== detail.recordId) return;

      if (detail.mode === "append-array") {
        const current = targetInput.value.trim();
        targetInput.value = current ? `${current}, ${detail.publicUrl}` : detail.publicUrl;
      } else {
        targetInput.value = detail.publicUrl;
      }
    };

    window.addEventListener("admin-upload-complete", handler as EventListener);
    return () => window.removeEventListener("admin-upload-complete", handler as EventListener);
  }, [table]);

  return (
    <form
      ref={formRef}
      className="glass space-y-4 rounded-2xl p-5"
      action={(formData) =>
        start(async () => {
          const payload: Record<string, unknown> = {};
          fields.forEach((f) => {
            const raw = formData.get(f.name)?.toString() ?? "";
            payload[f.name] = f.type === "number" && raw !== "" ? Number(raw) : raw;
          });
          if ((!payload.id || payload.id === "") && typeof payload.title === "string") {
            payload.id = payload.title
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")
              .replace(/-+/g, "-")
              .replace(/^-|-$/g, "");
          }
          const images = payload.images as string | undefined;
          if (images) payload.images = images.split(",").map((v) => v.trim());
          const gallery = payload.gallery as string | undefined;
          if (gallery) payload.gallery = gallery.split(",").map((v) => v.trim());
          await upsertRecord(table, payload);
        })
      }
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {fields.map((f) => {
        if (f.hidden) {
          return (
            <input
              key={f.name}
              type="hidden"
              name={f.name}
              defaultValue={f.defaultValue}
            />
          );
        }
        return (
          <label key={f.name} className="block text-sm">
            <span className="mb-1 block text-zinc-300">{f.label}</span>
            {f.multiline ? (
              <textarea
                name={f.name}
                required={f.required}
                defaultValue={f.defaultValue}
                placeholder={f.placeholder}
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none ring-purple-500 focus:ring"
              />
            ) : (
              <input
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                defaultValue={f.defaultValue}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none ring-purple-500 focus:ring"
              />
            )}
          </label>
        );
      })}
      <SaveButton pending={pending} />
    </form>
  );
}

export function DeleteForm({ table, label }: { table: "services" | "projects" | "skills" | "profiles" | "contact"; label: string }) {
  const [pending, start] = useTransition();
  return (
    <form
      className="glass space-y-3 rounded-2xl p-5"
      action={(formData) =>
        start(async () => {
          await deleteRecord(table, formData.get("id")?.toString() ?? "");
        })
      }
    >
      <h3 className="text-lg font-semibold">Delete {label}</h3>
      <input name="id" placeholder={`${label} id`} className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none" />
      <button type="submit" disabled={pending} className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-300 disabled:opacity-50">
        {pending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}

export function UploadImageForm({
  title,
  table,
  bucket,
  field,
  mode = "replace",
  hint
}: {
  title: string;
  table: "services" | "projects" | "profiles";
  bucket: "services" | "projects" | "profiles";
  field: "image" | "gallery" | "images";
  mode?: "replace" | "append-array";
  hint?: string;
}) {
  const [pending, start] = useTransition();
  const [lastUploadedUrl, setLastUploadedUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <form
      className="glass space-y-4 rounded-2xl p-5"
      action={(formData) =>
        start(async () => {
          setErrorMessage("");
          formData.set("table", table);
          formData.set("bucket", bucket);
          formData.set("field", field);
          formData.set("mode", mode);
          const recordId = formData.get("recordId")?.toString() ?? "";
          const result = await uploadImageToRecord(formData);
          if (result.error) {
            setErrorMessage(result.error);
            return;
          }
          if (result.publicUrl) {
            setLastUploadedUrl(result.publicUrl);
            window.dispatchEvent(
              new CustomEvent("admin-upload-complete", {
                detail: {
                  table,
                  field,
                  mode,
                  recordId,
                  publicUrl: result.publicUrl
                }
              })
            );
          }
        })
      }
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {hint ? <p className="text-sm text-zinc-400">{hint}</p> : null}
      <label className="block text-sm">
        <span className="mb-1 block text-zinc-300">Record ID</span>
        <input
          name="recordId"
          required
          placeholder="e.g. logo-design or main-profile"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none ring-purple-500 focus:ring"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-zinc-300">Image File</span>
        <input
          name="file"
          required
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none ring-purple-500 file:mr-4 file:rounded-md file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-white focus:ring"
        />
      </label>
      <button type="submit" disabled={pending} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold disabled:opacity-50">
        {pending ? "Uploading..." : "Upload"}
      </button>
      {errorMessage ? <p className="text-sm text-red-300">{errorMessage}</p> : null}
      {lastUploadedUrl ? (
        <p className="text-sm text-emerald-300 break-all">
          Uploaded URL auto-filled: {lastUploadedUrl}
        </p>
      ) : null}
    </form>
  );
}
