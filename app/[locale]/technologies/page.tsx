import { getTranslations } from "next-intl/server";
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
  Sass: "A mature CSS extension language that adds power and elegance to the basic language.",
  CSS3: "The latest evolution of the Cascading Style Sheets language, enabling rich visual styling.",
  HTML5:
    "The standard markup language for creating web pages and web applications.",
  PHP: "A popular general-purpose scripting language especially suited to web development.",
  Apache: "A widely used open-source web server software.",
  Nginx: "A high-performance HTTP server and reverse proxy server.",
};

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
}

export default async function TechnologiesPage() {
  const t = await getTranslations("Technologies");

  return (
    <main className="flex flex-1 flex-col w-full px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {t("title")}
        </h1>

        <p className="mt-2 text-text-muted">{t("description")}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_TECH_ICONS.map(({ name, src }, index) => {
            const slug = toSlug(name);

            return (
              <div
                key={name}
                className="flex flex-col group animate-fade-in rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-(--shadow-primary)"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-light p-3 transition-all duration-200 group-hover:bg-primary/10 group-hover:scale-110">
                  <Image
                    src={src}
                    alt={name}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                    unoptimized
                  />
                </div>

                <h2 className="mt-4 text-lg font-semibold text-text">{name}</h2>

                <p className="mt-2 mb-4 text-sm leading-relaxed text-text-muted line-clamp-3">
                  {TECH_DESCRIPTIONS[name]}
                </p>

                <Link
                  href={`/technologies/${slug}`}
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border-strong px-4 py-2.5 text-sm font-medium text-text-muted transition-all duration-200 hover:border-primary hover:bg-primary hover:text-text"
                >
                  {t("button")}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
