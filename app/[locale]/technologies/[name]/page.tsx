import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";
import { PROJECTS } from "@/lib/constants/projects";
import { getProficiencyLevel } from "@/lib/constants/tech-proficiency";
import { toSlug } from "@/lib/functions/slug";
import { FiArrowRight } from "react-icons/fi";

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
  const projectT = await getTranslations("Projects");

  const level = getProficiencyLevel(tech.name);

  const relatedProjects = PROJECTS.filter((p) =>
    (p.techStack as readonly string[]).includes(tech.name),
  );

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

        <div className="mt-6 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text">
              {t("proficiency")}
            </span>
            <span className="text-xs font-medium text-primary">
              {t(`level_${level}`)}
            </span>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-light">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
              style={{ width: `${(level / 4) * 100}%` }}
            />
          </div>

          <div className="mt-1 flex justify-between text-[10px] text-text-muted">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50">
          <h2 className="text-sm font-semibold text-text">
            {t("related_projects")}
          </h2>

          {relatedProjects.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <Link
                    key={project.id}
                    href="/projects"
                    className="group/project flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-(--shadow-primary)"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-light text-text-muted transition-colors group-hover/project:bg-primary/10 group-hover/project:text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text truncate">
                        {projectT(`items.${project.id}.title`)}
                      </p>
                      <p className="text-xs text-text-muted line-clamp-1">
                        {projectT(`items.${project.id}.description`)}
                      </p>
                    </div>
                    <FiArrowRight className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-all duration-200 group-hover/project:translate-x-0.5 group-hover/project:text-primary" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm text-text-muted">
              {t("no_related_projects")}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
