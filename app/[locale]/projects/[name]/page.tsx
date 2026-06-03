import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { FiGithub, FiExternalLink, FiCheck } from "react-icons/fi";
import { PROJECTS } from "@/lib/constants/projects";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";
import {
  pageContainer,
  backLink,
  detailIconBox,
  tagChip,
  cardContent,
  btnOutline,
  btnAction,
} from "@/lib/constants/styles";

function getTechIcon(name: string) {
  return ALL_TECH_ICONS.find((t) => t.name === name);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name: slug } = await params;

  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations("Projects");

  return (
    <main className={pageContainer}>
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/projects"
          className={backLink}
        >
          <span aria-hidden="true">&larr;</span>
          {t("back")}
        </Link>

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className={`${detailIconBox} text-text-muted hover:text-primary`}>
            <project.icon className="h-10 w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text">
              {t(`items.${project.id}.title`)}
            </h1>
            <p className="mt-1 text-sm text-primary">Project</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => {
            const icon = getTechIcon(tech);
            return (
              <Link
                key={tech}
                href={`/technologies/${tech.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-")}`}
                className={tagChip}
              >
                {icon && <img src={icon.src} alt="" className="h-3.5 w-3.5" />}
                {tech}
              </Link>
            );
          })}
        </div>

        <div className={`${cardContent} mt-8`}>
          <p className="text-base leading-relaxed text-text-muted">
            {t(`items.${project.id}.detail`)}
          </p>
        </div>

        <div className={`${cardContent} mt-6`}>
          <h2 className="text-sm font-semibold text-text">
            {t("challenges_title")}
          </h2>

          <ul className="mt-4 space-y-3">
            {(t.raw(`items.${project.id}.challenges`) as string[]).map(
              (challenge, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <FiCheck className="h-3 w-3 text-primary" />
                  </span>
                  <span className="text-sm leading-relaxed text-text-muted">
                    {challenge}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutline}
            >
              <FiGithub className="h-4 w-4" />
              {t("github")}
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnAction}
            >
              <FiExternalLink className="h-4 w-4" />
              {t("live")}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
