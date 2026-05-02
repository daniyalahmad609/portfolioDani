"use server";

import { Contact, Profile, Project, Service, Skill } from "@/types/database";
import { getSupabaseServerClient } from "./supabase/server";

const fallbackProfile: Profile = {
  id: "seed-profile",
  name: "Daniyal Ahmad",
  bio: "Daniyal Ahmad, a specialist in high-end visual communication. We transform brands into icons through a blend of technical precision and minimalist luxury. Focusing on Branding, UI/UX, and Packaging, I bridge the gap between creative intuition and strategic execution. Here, design isn't just an asset — it’s a premium experience.",
  image: null,
  education: "FSc (Pre-Medical)"
};

const fallbackSkills: Skill[] = [
  "Visual Hierarchy & Composition",
  "Typography Fundamentals",
  "Color Theory",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Figma (UI/UX)"
].map((name, i) => ({ id: String(i), name, sort_order: i }));

const fallbackServices: Service[] = [
  ["Logo Design", "Crafting distinctive and scalable logo identities that define your brand’s core essence. Designed with precision to ensure timeless recognition and versatility across platforms."],
  ["Brand Identity Design", "Building complete visual systems that elevate brands into premium, recognizable experiences. From color strategy to typography, every detail is aligned for consistency and impact."],
  ["Social Media Design", "Creating high-converting, visually engaging social media content that drives audience interaction. Modern layouts and brand-focused visuals designed for growth and performance."],
  ["Poster & Banner Design", "Designing bold and eye-catching posters and banners that communicate messages instantly. Strategically crafted visuals optimized for both digital and print environments."],
  ["Packaging Design", "Developing premium packaging that combines aesthetics with functional brand storytelling. Focused on shelf impact, clarity, and a luxury visual experience."],
  ["Brochure & Print Design", "Designing clean, structured, and professional print materials that enhance brand communication. Balanced layouts and typography for maximum readability and visual appeal."],
  ["Panaflex & Advertising Design", "Creating large-scale advertising visuals with strong hierarchy and high visibility. Designed to capture attention and deliver clear messaging in seconds."],
  ["UI/UX Design", "Designing intuitive and modern digital interfaces that enhance user experience. Focused on usability, clarity, and seamless interaction across all devices."]
].map(([title, description], i) => ({
  id: String(i + 1),
  title,
  description,
  image: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=1200&q=80",
  gallery: null,
  sort_order: i + 1
}));

const fallbackProjects: Project[] = [
  {
    id: "maldives-travel-poster",
    title: "Maldives Travel Poster",
    category: "Print",
    description: "A vibrant luxury travel campaign poster focused on wanderlust and premium tourism.",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"],
    sort_order: 1
  },
  {
    id: "furniture-brochure-design",
    title: "Furniture Brochure Design",
    category: "Branding",
    description: "Editorial brochure layout designed for a premium interior furniture catalog.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80"],
    sort_order: 2
  },
  {
    id: "vitamin-c-serum-packaging",
    title: "Vitamin C Serum Packaging",
    category: "Packaging",
    description: "Modern skincare packaging system with a clean hierarchy and luxury shelf impact.",
    images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1600&q=80"],
    sort_order: 3
  }
];

const fallbackContact: Contact = {
  id: "seed-contact",
  email: "daniyalmustafa609@gmail.com",
  phone: "03166976309",
  location: "Jampur District Rajanpur",
  whatsapp: "03166976309"
};

export async function getSiteData() {
  const client = getSupabaseServerClient();
  if (!client) {
    return {
      profile: fallbackProfile,
      skills: fallbackSkills,
      services: fallbackServices,
      projects: fallbackProjects,
      contact: fallbackContact
    };
  }

  const [{ data: profile }, { data: skills }, { data: services }, { data: projects }, { data: contact }] = await Promise.all([
    client.from("profiles").select("*").limit(1).single(),
    client.from("skills").select("*").order("sort_order", { ascending: true }),
    client.from("services").select("*").order("sort_order", { ascending: true }),
    client.from("projects").select("*").order("sort_order", { ascending: true }),
    client.from("contact").select("*").limit(1).single()
  ]);

  return {
    profile: (profile as Profile) ?? fallbackProfile,
    skills: (skills as Skill[]) ?? fallbackSkills,
    services: (services as Service[]) ?? fallbackServices,
    projects: (projects as Project[]) ?? fallbackProjects,
    contact: (contact as Contact) ?? fallbackContact
  };
}

export async function getProjectById(id: string) {
  const client = getSupabaseServerClient();
  if (!client) return fallbackProjects.find((p) => p.id === id) ?? fallbackProjects[0];
  const { data } = await client.from("projects").select("*").eq("id", id).single();
  return (data as Project) ?? null;
}
