import { DeleteForm, GenericUpsertForm } from "@/components/admin/AdminForms";
import { getAdminSkills } from "@/lib/admin-data";
import Link from "next/link";

export default async function AdminSkillsPage() {
  const skills = await getAdminSkills();
  return (
    <main className="container-padding py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Skills</h1>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-semibold transition hover:border-purple-500 hover:text-white"
        >
          Visit Site
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GenericUpsertForm
          table="skills"
          title="Add / Edit Skill"
          fields={[
            { name: "id", label: "ID", required: true },
            { name: "name", label: "Skill Name", required: true },
            { name: "sort_order", label: "Sort order", type: "number" }
          ]}
        />
        <DeleteForm table="skills" label="skill" />
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Current Skills</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill.id} className="glass rounded-full px-4 py-2 text-sm">
              {skill.name} <span className="text-zinc-500">({skill.id})</span>
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
