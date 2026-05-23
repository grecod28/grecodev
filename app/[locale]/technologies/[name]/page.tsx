import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name: slug } = await params;

  const tech = ALL_TECH_ICONS.find((t) => toSlug(t.name) === slug);

  if (!tech) {
    notFound();
  }

  const t = await getTranslations("Technologies");

  return (
    <main className="flex flex-1 flex-col w-full px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/technologies"
          className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Technologies
        </Link>

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-surface-light p-5 transition-all duration-300 hover:bg-primary/10 hover:scale-105">
            <Image
              src={tech.src}
              alt={tech.name}
              width={48}
              height={48}
              className="h-12 w-12"
              unoptimized
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text">
              {tech.name}
            </h1>
            <p className="mt-1 text-sm text-primary">Technology</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50">
          <p className="text-base leading-relaxed text-text-muted">
            {t(`items.${toSlug(tech.name)}`)}
          </p>
        </div>
      </div>
    </main>
  );
}
