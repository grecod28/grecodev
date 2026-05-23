import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";

const TECH_DESCRIPTIONS: Record<string, string> = {
  TypeScript:
    "A typed superset of JavaScript that compiles to plain JavaScript, enabling better tooling and developer experience.",
  JavaScript:
    "A high-level, dynamic programming language that powers the interactive web.",
  "Next.js":
    "A React framework for production-grade applications with server-side rendering and static generation.",
  NestJS:
    "A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.",
  Angular:
    "A platform for building mobile and desktop web applications using TypeScript and other languages.",
  PostgreSQL:
    "A powerful, open-source object-relational database system with a strong reputation for reliability.",
  MongoDB:
    "A NoSQL document database designed for ease of development and scaling.",
  Redis:
    "An in-memory data structure store used as a database, cache, and message broker.",
  "Tailwind CSS":
    "A utility-first CSS framework for rapidly building custom user interfaces.",
  Sass:
    "A mature CSS extension language that adds power and elegance to the basic language.",
  CSS3:
    "The latest evolution of the Cascading Style Sheets language, enabling rich visual styling.",
  HTML5:
    "The standard markup language for creating web pages and web applications.",
  PHP: "A popular general-purpose scripting language especially suited to web development.",
  Apache:
    "A widely used open-source web server software.",
  Nginx:
    "A high-performance HTTP server and reverse proxy server.",
};

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

  const description = TECH_DESCRIPTIONS[tech.name];

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
            {description}
          </p>
        </div>
      </div>
    </main>
  );
}
