import { Project, Service, Skill, Profile } from "@/types/database";
import { getSupabaseServerClient } from "./supabase/server";

export async function getAdminServices() {
  const client = getSupabaseServerClient();
  if (!client) return [] as Service[];
  const { data } = await client.from("services").select("*").order("sort_order", { ascending: true });
  return (data ?? []) as Service[];
}

export async function getAdminProjects() {
  const client = getSupabaseServerClient();
  if (!client) return [] as Project[];
  const { data } = await client.from("projects").select("*").order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}

export async function getAdminSkills() {
  const client = getSupabaseServerClient();
  if (!client) return [] as Skill[];
  const { data } = await client.from("skills").select("*").order("sort_order", { ascending: true });
  return (data ?? []) as Skill[];
}

export async function getAdminProfiles() {
  const client = getSupabaseServerClient();
  if (!client) return [] as Profile[];
  const { data } = await client.from("profiles").select("*");
  return (data ?? []) as Profile[];
}
