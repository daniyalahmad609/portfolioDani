import { DeleteForm, GenericUpsertForm, UploadImageForm } from "@/components/admin/AdminForms";
import { getAdminProjects } from "@/lib/admin-data";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();
  return (
    <main className="container-padding py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-semibold transition hover:border-purple-500 hover:text-white"
        >
          Visit Site
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GenericUpsertForm
          table="projects"
          title="Add / Edit Project"
          fields={[
            { name: "id", label: "ID (slug)", required: true },
            { name: "title", label: "Title", required: true },
            { name: "category", label: "Category", required: true },
            { name: "description", label: "Description", required: true, multiline: true },
            { name: "images", label: "Image URLs (comma-separated)", required: true },
            { name: "sort_order", label: "Sort order", type: "number" }
          ]}
        />
        <DeleteForm table="projects" label="project" />
        <UploadImageForm
          title="Upload Project Gallery Image"
          table="projects"
          bucket="projects"
          field="images"
          mode="append-array"
          hint="Appends uploaded image URL into project images array."
        />
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Current Projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="glass rounded-xl p-4">
              <p className="text-xs text-zinc-400">ID: {project.id}</p>
              <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{project.category}</p>
              <p className="mt-2 text-sm text-zinc-400">{project.description}</p>
              <p className="mt-3 text-xs text-zinc-500">
                Images: {project.images?.length ?? 0}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
