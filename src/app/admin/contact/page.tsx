import { DeleteForm, GenericUpsertForm } from "@/components/admin/AdminForms";
import Link from "next/link";

export default function AdminContactPage() {
  return (
    <main className="container-padding py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Contact</h1>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-semibold transition hover:border-purple-500 hover:text-white"
        >
          Visit Site
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <GenericUpsertForm
          table="contact"
          title="Add / Edit Contact"
          fields={[
            { name: "id", label: "ID", required: true },
            { name: "email", label: "Email", required: true },
            { name: "phone", label: "Phone", required: true },
            { name: "whatsapp", label: "Whatsapp Number" },
            { name: "location", label: "Location" }
          ]}
        />
        <DeleteForm table="contact" label="contact row" />
      </div>
    </main>
  );
}
