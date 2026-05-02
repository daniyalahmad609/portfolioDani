import { DeleteForm, GenericUpsertForm, UploadImageForm } from "@/components/admin/AdminForms";
import { getAdminProfiles } from "@/lib/admin-data";
import Link from "next/link";

export default async function AdminProfilePage() {
  const profiles = await getAdminProfiles();
  return (
    <main className="container-padding py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Profile / About</h1>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-semibold transition hover:border-purple-500 hover:text-white"
        >
          Visit Site
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GenericUpsertForm
          table="profiles"
          title="Add / Edit Profile"
          fields={[
            { name: "id", label: "ID", required: true },
            { name: "name", label: "Name", required: true },
            { name: "bio", label: "Bio", required: true, multiline: true },
            { name: "education", label: "Education" },
            { name: "image", label: "Profile image URL" }
          ]}
        />
        <DeleteForm table="profiles" label="profile" />
        <UploadImageForm
          title="Upload Profile Image"
          table="profiles"
          bucket="profiles"
          field="image"
          hint="Replaces profile image field with uploaded file URL."
        />
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Current About/Profile Entries</h2>
        <div className="mt-4 grid gap-4">
          {profiles.map((profile) => (
            <article key={profile.id} className="glass rounded-xl p-4">
              <p className="text-xs text-zinc-400">ID: {profile.id}</p>
              <h3 className="mt-1 text-lg font-semibold">{profile.name}</h3>
              <p className="mt-2 text-sm text-zinc-400">{profile.bio}</p>
              <p className="mt-2 text-sm text-zinc-500">Education: {profile.education ?? "-"}</p>
              <p className="mt-1 text-sm text-zinc-500">Profile Image: {profile.image ?? "-"}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
