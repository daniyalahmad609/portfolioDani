"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "../supabase/server";

type Entity = "services" | "projects" | "skills" | "profiles" | "contact";

export async function upsertRecord(table: Entity, payload: Record<string, unknown>) {
  const admin = getSupabaseAdminClient();
  if (!admin) return { error: "Missing Supabase service role env." };
  const { error } = await admin.from(table).upsert(payload);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/services");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/skills");
  revalidatePath("/projects/[id]", "page");
  return { error: error?.message ?? null };
}

export async function deleteRecord(table: Entity, id: string) {
  const admin = getSupabaseAdminClient();
  if (!admin) return { error: "Missing Supabase service role env." };
  const { error } = await admin.from(table).delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/services");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/skills");
  revalidatePath("/projects/[id]", "page");
  return { error: error?.message ?? null };
}

export async function uploadImageToRecord(formData: FormData) {
  try {
    const admin = getSupabaseAdminClient();
    if (!admin) return { error: "Missing Supabase service role env." };

    const table = formData.get("table")?.toString() as Entity | undefined;
    const recordId = formData.get("recordId")?.toString();
    const field = formData.get("field")?.toString();
    const bucket = formData.get("bucket")?.toString();
    const mode = formData.get("mode")?.toString() ?? "replace";
    const file = formData.get("file");

    if (!table || !recordId || !field || !bucket || !(file instanceof File)) {
      return { error: "Missing upload parameters." };
    }

    const extension = file.name.split(".").pop() ?? "jpg";
    const safeName = `${recordId}-${Date.now()}.${extension}`;
    const path = `${table}/${safeName}`;

    try {
      const { error: uploadError } = await admin.storage.from(bucket).upload(path, file, {
        contentType: file.type || "image/jpeg",
        upsert: true
      });
      
      if (uploadError) {
        const errorMessage = typeof uploadError === "object" && uploadError !== null && "message" in uploadError
          ? String(uploadError.message)
          : String(uploadError);
        return { error: errorMessage || "Upload failed" };
      }
    } catch (uploadErr) {
      const errorMessage = uploadErr instanceof Error ? uploadErr.message : String(uploadErr);
      return { error: `Upload error: ${errorMessage}` };
    }

    let publicUrl: string;
    try {
      const storageResponse = admin.storage.from(bucket).getPublicUrl(path);
      publicUrl = storageResponse?.data?.publicUrl || storageResponse?.publicUrl;
      
      if (!publicUrl || typeof publicUrl !== "string") {
        return { error: "Failed to generate public URL for uploaded file" };
      }
    } catch (urlErr) {
      const errorMessage = urlErr instanceof Error ? urlErr.message : String(urlErr);
      return { error: `Failed to get public URL: ${errorMessage}` };
    }

    if (mode === "append-array") {
      try {
        const { data: existingRow, error: fetchError } = await admin
          .from(table)
          .select(field)
          .eq("id", recordId)
          .single();
        
        if (fetchError) {
          const errorMessage = typeof fetchError === "object" && fetchError !== null && "message" in fetchError
            ? String(fetchError.message)
            : String(fetchError);
          return { error: `Failed to fetch existing record: ${errorMessage}` };
        }

        const row = (existingRow ?? {}) as unknown as Record<string, unknown>;
        const currentField = row[field];
        const existingValues = Array.isArray(currentField) ? (currentField as string[]) : [];
        const nextValues = [...existingValues, publicUrl];

        const { error: updateError } = await admin
          .from(table)
          .update({ [field]: nextValues })
          .eq("id", recordId);
        
        if (updateError) {
          const errorMessage = typeof updateError === "object" && updateError !== null && "message" in updateError
            ? String(updateError.message)
            : String(updateError);
          return { error: `Failed to update record: ${errorMessage}` };
        }
      } catch (appendErr) {
        const errorMessage = appendErr instanceof Error ? appendErr.message : String(appendErr);
        return { error: `Append operation failed: ${errorMessage}` };
      }
    } else {
      try {
        const { error: updateError } = await admin
          .from(table)
          .update({ [field]: publicUrl })
          .eq("id", recordId);
        
        if (updateError) {
          const errorMessage = typeof updateError === "object" && updateError !== null && "message" in updateError
            ? String(updateError.message)
            : String(updateError);
          return { error: `Failed to update record: ${errorMessage}` };
        }
      } catch (updateErr) {
        const errorMessage = updateErr instanceof Error ? updateErr.message : String(updateErr);
        return { error: `Update operation failed: ${errorMessage}` };
      }
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/services");
    revalidatePath("/admin/projects");
    revalidatePath("/admin/profile");
    revalidatePath("/projects/[id]", "page");

    return { error: null, publicUrl };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("uploadImageToRecord error:", err);
    return { error: `Unexpected error: ${errorMessage}` };
  }
}
