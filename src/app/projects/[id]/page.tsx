import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return notFound();

  return (
    <main className="container-padding py-12">
      <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100">
        ← Back to Home
      </Link>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-widest text-zinc-500">{project.category}</p>
        <h1 className="mt-2 text-4xl font-bold md:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">{project.description}</p>
      </div>

      <div className="relative mt-10 h-[420px] overflow-hidden rounded-3xl border border-zinc-800">
        <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {project.images.map((img, idx) => (
          <div key={`${img}-${idx}`} className="relative h-72 overflow-hidden rounded-2xl border border-zinc-800">
            <Image src={img} alt={`${project.title} ${idx + 1}`} fill className="object-cover" />
          </div>
        ))}
      </section>
    </main>
  );
}
