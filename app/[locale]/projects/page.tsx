import { getTranslations } from "next-intl/server";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { PROJECTS } from "@/lib/constants/projects";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { pageContainer, sectionContainer } from "@/lib/constants/styles";

const PLACEHOLDER_GRADIENTS = [
  "from-indigo-600 to-purple-700",
  "from-emerald-600 to-teal-700",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
];

const GLOW_COLORS = [
  {
    ring: "ring-violet-500/45",
    hoverRing: "group-hover/image:ring-violet-400/80",
    shadow: "rgba(139,92,246,0.28)", // violet-500
    hoverShadow: "rgba(139,92,246,0.50)",
  },
  {
    ring: "ring-amber-500/40",
    hoverRing: "group-hover/image:ring-amber-400/70",
    shadow: "rgba(245,158,11,0.25)",
    hoverShadow: "rgba(245,158,11,0.45)",
  },
  {
    ring: "ring-emerald-500/40",
    hoverRing: "group-hover/image:ring-emerald-400/70",
    shadow: "rgba(16,185,129,0.25)",
    hoverShadow: "rgba(16,185,129,0.45)",
  },
  {
    ring: "ring-amber-500/40",
    hoverRing: "group-hover/image:ring-amber-400/70",
    shadow: "rgba(245,158,11,0.25)",
    hoverShadow: "rgba(245,158,11,0.45)",
  },
  {
    ring: "ring-rose-500/40",
    hoverRing: "group-hover/image:ring-rose-400/70",
    shadow: "rgba(244,63,94,0.25)",
    hoverShadow: "rgba(244,63,94,0.45)",
  },
];

function getTechIcon(name: string) {
  return ALL_TECH_ICONS.find((t) => t.name === name);
}

export default async function ProjectsPage() {
  const t = await getTranslations("Projects");
  const c = await getTranslations("Common");

  return (
    <main className={pageContainer}>
      <section className={`${sectionContainer} w-full`}>
        <header className="text-center animate-fade-in mb-14">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-text-muted">{t("description")}</p>
        </header>

        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, index) => {
            const {
              id,
              icon: Icon,
              techStack,
              githubUrl,
              liveUrl,
              ImageSrc,
            } = project;
            const isLeft = index % 2 === 0;
            const gradient =
              PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];
            const glow = GLOW_COLORS[index % GLOW_COLORS.length];

            return (
              <div
                key={id}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14 ${
                  isLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="reveal-left relative w-full shrink-0 lg:w-[55%]">
                  <Link href={`/projects/${id}`} className="group/image block">
                    <div
                      className={`overflow-hidden rounded-2xl ring-1 ${glow.ring} transition-all duration-300 ${glow.hoverRing}`}
                      style={{ boxShadow: `0 0 18px ${glow.shadow}` }}
                    >
                      {ImageSrc ? (
                        <Image
                          src={ImageSrc}
                          alt={t(`items.${id}.title`)}
                          width={1200}
                          height={675}
                          className="h-auto w-full object-contain transition-transform duration-500 group-hover/image:scale-105"
                          sizes="(max-width: 1024px) 100vw, 55vw"
                        />
                      ) : (
                        <div
                          className={`flex aspect-video items-center justify-center bg-linear-to-br ${gradient} transition-transform duration-500 group-hover/image:scale-105`}
                        >
                          <Icon className="h-28 w-28 text-white/20" />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                <div
                  className={`reveal-right flex flex-col lg:w-[45%] ${isLeft ? "" : "lg:text-right lg:items-end"}`}
                >
                  <Link href={`/projects/${id}`} className="group/title">
                    <h2 className="text-2xl font-bold transition-colors group-hover/title:text-primary sm:text-3xl">
                      {t(`items.${id}.title`)}
                    </h2>
                  </Link>

                  <p className="mt-4 text-base leading-relaxed text-text-muted">
                    {t(`items.${id}.description`)}
                  </p>

                  <div
                    className={`mt-5 flex flex-wrap gap-1.5 ${isLeft ? "" : "lg:justify-end"}`}
                  >
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

                  <div className="mt-7 flex gap-3">
                    {liveUrl && (
                      <Link
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary/90 rounded-lg px-5 py-2.5 text-sm font-medium text-text"
                      >
                        {t("live")}
                      </Link>
                    )}

                    <Link
                      href={`/projects/${project.id}`}
                      className="btn-fill inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm font-medium text-text transition-all duration-200 hover:text-white"
                    >
                      {c("learn_more")}
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
