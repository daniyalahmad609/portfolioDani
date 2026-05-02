"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Contact, Profile, Project, Service, Skill } from "@/types/database";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), { ssr: false });

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
};

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="container-padding pt-8 md:pt-12">
      <div className="glass mb-8 rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-400" />
            <div>
              <p className="text-lg font-semibold tracking-wide">OneX Studio</p>
              <p className="text-xs text-zinc-400">by Daniyal Ahmad</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#skills" className="hover:text-white">Skill</a>
            <a href="#services" className="hover:text-white">Service</a>
            <a href="#education" className="hover:text-white">Education</a>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-zinc-700 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="h-0.5 w-5 bg-zinc-200" />
            <span className="h-0.5 w-5 bg-zinc-200" />
            <span className="h-0.5 w-5 bg-zinc-200" />
          </button>
        </div>
        {isMenuOpen ? (
          <nav className="mt-3 grid gap-2 border-t border-zinc-800 pt-3 text-sm text-zinc-300 md:hidden">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-white">About</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Skill</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Service</a>
            <a href="#education" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Education</a>
            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Admin</Link>
          </nav>
        ) : null}
      </div>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">OneX Studio</h1>
          <p className="mt-3 text-xl text-zinc-300 md:text-2xl">Graphic Designer & UI/UX Designer</p>
          <p className="mt-5 max-w-xl text-zinc-400">Crafting clean, modern and impactful visual experiences</p>
          <a href="#portfolio" className="glass mt-8 inline-block rounded-full px-7 py-3 text-sm font-semibold transition hover:scale-105 hover:border-purple-500">
            View My Work
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="glass rounded-3xl border border-zinc-800">
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}

export function AboutSection({ profile, skills }: { profile: Profile; skills: Skill[] }) {
  return (
    <motion.section {...reveal} id="about" className="container-padding mt-28">
      <h2 className="text-4xl font-bold md:text-5xl">About</h2>
      <p className="mt-6 max-w-4xl leading-8 text-zinc-300">{profile.bio}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div id="education" className="glass rounded-2xl p-6">
          <p className="text-sm uppercase tracking-widest text-zinc-400">Education</p>
          <p className="mt-3 text-xl font-semibold">{profile.education ?? "FSc (Pre-Medical)"}</p>
        </div>
        <div id="skills" className="glass rounded-2xl p-6">
          <p className="text-sm uppercase tracking-widest text-zinc-400">Skills</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill.id} className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-200">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <motion.section {...reveal} id="services" className="container-padding mt-28">
      <h2 className="text-4xl font-bold md:text-5xl">Services</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <motion.article key={service.id} whileHover={{ y: -6, scale: 1.02 }} className="glass group overflow-hidden rounded-2xl border border-zinc-800">
            <div className="relative h-48 overflow-hidden">
              <Image src={service.image || "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=1200&q=80"} alt={service.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{service.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export function PortfolioSection({ projects }: { projects: Project[] }) {
  return (
    <motion.section {...reveal} id="portfolio" className="container-padding mt-28">
      <h2 className="text-4xl font-bold md:text-5xl">Case Studies</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="group glass overflow-hidden rounded-2xl border border-zinc-800">
            <div className="relative h-64 overflow-hidden">
              <Image src={project.images[0]} alt={project.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-zinc-500">{project.category}</p>
              <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

export function ContactSection({ contact }: { contact: Contact }) {
  return (
    <motion.section {...reveal} className="container-padding mt-28 pb-20">
      <div className="glass rounded-3xl border border-zinc-800 p-8 md:p-12">
        <h2 className="text-4xl font-bold md:text-5xl">Let's Work Together</h2>
        <div className="mt-8 grid gap-4 text-zinc-300 md:grid-cols-3">
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
          <p>{contact.location}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={`https://wa.me/${contact.whatsapp ?? contact.phone}`} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-500">
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a href={`mailto:${contact.email}`} className="rounded-full border border-zinc-600 px-6 py-3 font-semibold transition hover:border-purple-500">
            Start a Project
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export function FooterSection() {
  return (
    <footer className="container-padding border-t border-zinc-800 py-8 text-sm text-zinc-400">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p>© {new Date().getFullYear()} OneX Studio. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="https://www.behance.net" target="_blank">Behance</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
