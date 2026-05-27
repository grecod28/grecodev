import { getTranslations } from "next-intl/server";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { PROJECTS } from "@/lib/constants/projects";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";
import Link from "next/link";

function getTechIcon(name: string) {
  return ALL_TECH_ICONS.find((t) => t.name === name);
}

export default async function ProjectsPage() {
  const t = await getTranslations("Projects");

  return (
    <main className="flex flex-1 flex-col w-full px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className="flex flex-col items-center text-center animate-fade-in"
          style={{ animationDelay: "0ms" }}
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-lg text-text-muted">{t("description")}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => {
            const { id, icon: Icon, techStack, githubUrl, liveUrl } = project;

            return (
              <div
                key={id}
                className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-(--shadow-primary)"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Enlace principal que cubre TODA la tarjeta */}
                <Link href={`/projects/${id}`} className="absolute inset-0 z-0">
                  <span className="sr-only">{t(`items.${id}.title`)}</span>
                </Link>

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-light text-text-muted transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                  {t(`items.${id}.title`)}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-3">
                  {t(`items.${id}.description`)}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {techStack.map((tech) => {
                    const icon = getTechIcon(tech);
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded-md bg-surface-light px-2 py-1 text-[10px] font-medium text-text-muted"
                      >
                        {icon && (
                          <img src={icon.src} alt="" className="h-3 w-3" />
                        )}
                        {tech}
                      </span>
                    );
                  })}
                </div>

                {/* Contenedor de botones con z-index alto para estar sobre el Link padre */}
                <div className="mt-auto flex items-center gap-3 pt-4 relative z-10">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-3 py-1.5 text-xs font-medium text-text-muted transition-all duration-200 hover:border-primary hover:bg-primary hover:text-text"
                      aria-label={`${t("github")} — ${t(`items.${id}.title`)}`}
                    >
                      <FiGithub className="h-3.5 w-3.5" />
                      {t("github")}
                    </a>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-primary-hover"
                      aria-label={`${t("live")} — ${t(`items.${id}.title`)}`}
                    >
                      <FiExternalLink className="h-3.5 w-3.5" />
                      {t("live")}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
