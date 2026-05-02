import Link from "next/link";

const links = [
  ["Services", "/admin/services"],
  ["Projects", "/admin/projects"],
  ["Profile / About", "/admin/profile"],
  ["Skills", "/admin/skills"],
  ["Contact", "/admin/contact"]
];

export default function AdminHomePage() {
  return (
    <main className="container-padding py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-semibold transition hover:border-purple-500 hover:text-white"
        >
          Visit Site
        </Link>
      </div>
      <p className="mt-3 text-zinc-400">Manage all portfolio content from these sections.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="glass rounded-xl p-5 transition hover:border-purple-500">
            <h2 className="text-xl font-semibold">{label}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
