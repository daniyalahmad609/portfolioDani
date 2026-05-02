import Image from "next/image";
import { DeleteForm, GenericUpsertForm, UploadImageForm } from "@/components/admin/AdminForms";
import { getAdminServices } from "@/lib/admin-data";
import Link from "next/link";

export default async function AdminServicesPage() {
  const services = await getAdminServices();
  return (
    <main className="container-padding py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-semibold transition hover:border-purple-500 hover:text-white"
        >
          Visit Site
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GenericUpsertForm
          table="services"
          title="Add / Edit Service"
          fields={[
            { name: "id", label: "ID", type: "hidden", hidden: true },
            { name: "title", label: "Title", required: true },
            { name: "description", label: "Description", required: true, multiline: true },
            { name: "sort_order", label: "Sort order", type: "number" }
          ]}
        />
        <div className="glass rounded-2xl p-5 text-sm text-zinc-400">
          <p>Service ID is generated automatically from the title.</p>
          <p className="mt-2">After saving a service, use the upload forms below to attach the main image or gallery images.</p>
        </div>
        <DeleteForm table="services" label="service" />
        <UploadImageForm
          title="Upload Service Main Image"
          table="services"
          bucket="services"
          field="image"
          hint="Enter the service slug (generated from title) and upload the main image."
        />
        <UploadImageForm
          title="Upload Service Gallery Image"
          table="services"
          bucket="services"
          field="gallery"
          mode="append-array"
          hint="Enter the service slug and append gallery image URLs to the service." 
        />
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Current Services</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="glass rounded-xl p-4">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                <Image
                  src={service.image || "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=1200&q=80"}
                  alt={`${service.title} image`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-xs text-zinc-400">ID: {service.id}</p>
              <h3 className="mt-1 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{service.description}</p>
              <p className="mt-3 text-xs text-zinc-500">
                Gallery Images: {service.gallery?.length ?? 0}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
