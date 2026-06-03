import { TECH_STACK_ICONS } from "@/lib/constants/icons";
import { PROJECTS } from "@/lib/constants/projects";
import { toSlug } from "@/lib/functions/slug";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FiArrowRight, FiMail } from "react-icons/fi";

const featuredProjects = PROJECTS.filter((p) => p.featured);

export default async function Home() {
  const t = await getTranslations("Index");
  const projectT = await getTranslations("Projects");

  return (
    <main className="flex flex-1 flex-col items-center w-full">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center w-full px-4 pt-16 pb-16">
        <div className="flex flex-col items-center text-center max-w-3xl">
          <div className="relative mb-6">
            <div
              className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl"
              aria-hidden="true"
            />
            <Image
              src="/images/foto_perfil.jpg"
              alt="Santiago Greco"
              width={120}
              height={120}
              className="relative rounded-full object-cover ring-4 ring-border-strong shadow-surface"
              priority
            />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Santiago Greco
          </h1>

          <p className="mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
            {t("role")}
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
            {t("bio")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-text transition-all duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("cta_projects")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-border-strong px-6 py-3 text-sm font-medium text-text transition-all duration-200 hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("cta_contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="w-full border-t border-border px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t("featured_title")}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
              {t("featured_title")}
            </h2>
            <p className="mt-3 max-w-lg text-text-muted">
              {t("featured_desc")}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-(--shadow-primary)"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-light text-text-muted transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-text">
                    {projectT(`items.${project.id}.title`)}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
                    {projectT(`items.${project.id}.description`)}
                  </p>

                  <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-primary">
                    More details
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-6 py-3 text-sm font-medium text-text transition-all duration-200 hover:bg-surface-light"
            >
              {t("featured_cta")}
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="w-full border-t border-border px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t("tech_stack")}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
              {t("tech_stack")}
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            {TECH_STACK_ICONS.map(({ name, src }) => (
              <Link
                key={name}
                href={`/technologies/${toSlug(name)}`}
                className="group flex flex-col items-center gap-2 animate-fade-in"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-light p-2.5 transition-all duration-200 group-hover:bg-primary/10 group-hover:scale-110">
                  <Image
                    src={src}
                    alt={name}
                    width={28}
                    height={28}
                    className="h-7 w-7"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] font-medium text-text-muted transition-colors group-hover:text-text">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="w-full border-t border-border px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t("contact_section_title")}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
              {t("contact_section_title")}
            </h2>
            <p className="mt-3 max-w-lg text-text-muted">
              {t("contact_section_desc")}
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 transition-all duration-200 hover:border-primary/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-light">
                <FiMail className="h-5 w-5 text-text-muted" />
              </div>
              <span className="text-sm font-medium text-text">
                {t("contact_section_email")}
              </span>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-text transition-all duration-200 hover:bg-primary-hover hover:shadow-(--shadow-primary)"
            >
              {t("contact_section_cta")}
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
