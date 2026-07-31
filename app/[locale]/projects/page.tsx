import { getTranslations } from "next-intl/server";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { PROJECTS } from "@/lib/constants/projects";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  pageContainer,
  sectionContainer,
} from "@/lib/constants/styles";

const PLACEHOLDER_GRADIENTS = [
  "from-indigo-600 to-purple-700",
  "from-emerald-600 to-teal-700",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
];

function getTechIcon(name: string) {
  return ALL_TECH_ICONS.find((t) => t.name === name);
}

export default async function ProjectsPage() {
  const t = await getTranslations("Projects");

  return (
    <main className={pageContainer}>
      <section className={`${sectionContainer} w-full`}>
        <header className="text-center animate-fade-in mb-14">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
          <p className="mt-2 text-text-muted">{t("description")}</p>
        </header>

        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, index) => {
            const { id, icon: Icon, techStack, githubUrl, liveUrl, ImageSrc } = project;
            const isLeft = index % 2 === 0;
            const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

            return (
              <div
                key={id}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14 ${
                  isLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="reveal-left w-full shrink-0 lg:w-[55%]">
                  <Link href={`/projects/${id}`} className="group/image block">
                    <div className="overflow-hidden rounded-2xl">
                      {ImageSrc ? (
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={ImageSrc}
                            alt={t(`items.${id}.title`)}
                            fill
                            className="object-contain transition-transform duration-500 group-hover/image:scale-105"
                            sizes="(max-width: 1024px) 100vw, 55vw"
                          />
                        </div>
                      ) : (
                        <div className={`flex aspect-[16/9] items-center justify-center bg-linear-to-br ${gradient} transition-transform duration-500 group-hover/image:scale-105`}>
                          <Icon className="h-28 w-28 text-white/20" />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Info */}
                <div className={`reveal-right flex flex-col lg:w-[45%] ${isLeft ? "" : "lg:text-right lg:items-end"}`}>
                  <Link href={`/projects/${id}`} className="group/title">
                    <h2 className="text-2xl font-bold transition-colors group-hover/title:text-primary sm:text-3xl">
                      {t(`items.${id}.title`)}
                    </h2>
                  </Link>

                  <p className="mt-4 text-base leading-relaxed text-text-muted">
                    {t(`items.${id}.description`)}
                  </p>

                  <div className={`mt-5 flex flex-wrap gap-1.5 ${isLeft ? "" : "lg:justify-end"}`}>
                    {techStack.map((tech) => {
                      const icon = getTechIcon(tech);
                      return (
                        <span key={tech} className="inline-flex items-center gap-1 rounded-md bg-surface-light px-2 py-1 text-[10px] font-medium text-text-muted">
                          {icon && <img src={icon.src} alt="" className="h-3 w-3" />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex gap-3">
                    <Link
                      href={`/projects/${id}`}
                      className="btn-fill inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm font-medium text-text transition-all duration-200 hover:text-white"
                    >
                      {t("live")}
                    </Link>
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm font-medium text-text-muted transition-all duration-200 hover:border-primary hover:bg-primary hover:text-text"
                      >
                        <FiGithub className="h-4 w-4" />
                        {t("github")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
