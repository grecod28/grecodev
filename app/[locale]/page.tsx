import { TECH_STACK_ICONS } from "@/lib/constants/icons";
import { ALL_TECH_ICONS } from "@/lib/constants/icons";
import { PROJECTS } from "@/lib/constants/projects";
import { toSlug } from "@/lib/functions/slug";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FiGithub } from "react-icons/fi";
import { FiArrowRight, FiMail } from "react-icons/fi";
import CanvasDots from "@/components/hero/canvas-dots";
import ProfilePhoto from "@/components/hero/profile-photo";
import SkillsGrid from "@/components/ui/skills-grid";
import {
  section,
  sectionCentered,
  sectionContainer,
  sectionLabel,
  sectionTitle,
  sectionDesc,
} from "@/lib/constants/styles";

const featuredProjects = PROJECTS.filter((p) => p.featured);

function getTechIconFromAll(name: string) {
  return ALL_TECH_ICONS.find((t) => t.name === name);
}

export default async function Home() {
  const t = await getTranslations("Index");
  const c = await getTranslations("Common");
  const projectT = await getTranslations("Projects");

  return (
    <main className="flex flex-1 flex-col items-center w-full">
      <section className="relative flex flex-col items-center justify-center w-full overflow-hidden min-h-screen px-4 sm:px-6 -mt-10 sm:-mt-16">
        <CanvasDots />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          <div className="animate-fade-in-up mb-8">
            <ProfilePhoto />
          </div>

          <h1 className="animate-fade-in-left text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Santiago Greco
          </h1>

          <p className="mt-3 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-xl font-semibold text-transparent sm:text-2xl lg:text-3xl bg-size-[200%_200%] animate-gradient">
            {t("role")}
          </p>

          <p className="animate-fade-in-up mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            {t("bio")}
          </p>

          <div className="animate-scale-in mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="btn-glow text-white inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold"
            >
              {t("cta_projects")}
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="btn-glow inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
            >
              {t("cta_contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className={`${section} reveal-scroll-up`}>
        <div className={sectionContainer}>
          <div className={sectionCentered}>
            <span className={sectionLabel}>{t("featured_title")}</span>
            <h2 className={sectionTitle}>{t("featured_title")}</h2>
            <p className={sectionDesc}>{t("featured_desc")}</p>
          </div>

          <div className="mt-10 flex flex-col gap-20 lg:gap-28">
            {featuredProjects.map((project, index) => {
              const Icon = project.icon;
              const { githubUrl, liveUrl } = project;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14 ${
                    isLeft ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="reveal-scroll-left group/image block w-full shrink-0 overflow-hidden rounded-2xl shadow-lg lg:w-[60%] transition-transform duration-500 hover:scale-[1.02]"
                  >
                    {project.ImageSrc ? (
                      <Image
                        src={project.ImageSrc}
                        alt={projectT(`items.${project.id}.title`)}
                        width={1200}
                        height={675}
                        className="h-auto w-full object-contain"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                        <Icon className="h-20 w-20 text-primary/30" />
                      </div>
                    )}
                  </Link>

                  <div
                    className={`reveal-scroll-right flex flex-col lg:w-[40%] ${isLeft ? "" : "lg:text-right lg:items-end"}`}
                    style={
                      {
                        "--reveal-delay": `${180 + index * 100}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="group/title"
                    >
                      <h3 className="text-2xl font-bold transition-colors group-hover/title:text-primary sm:text-3xl">
                        {projectT(`items.${project.id}.title`)}
                      </h3>
                    </Link>

                    <p className="mt-4 text-base leading-relaxed text-text-muted">
                      {projectT(`items.${project.id}.description`)}
                    </p>

                    <div
                      className={`mt-5 flex flex-wrap gap-1.5 ${isLeft ? "" : "lg:justify-end"}`}
                    >
                      {project.techStack.map((tech) => {
                        const icon = getTechIconFromAll(tech);
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
                          {c("live")}
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
                          {c("github")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/projects"
              className="btn-fill inline-flex items-center gap-2 rounded-lg border border-border-strong px-6 py-3 text-sm font-medium text-text transition-all duration-200 hover:text-white"
            >
              {t("featured_cta")}
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={`${section} reveal-scroll-scale`}>
        <div className={sectionContainer}>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
            <div className="flex flex-col items-center text-center justify-center lg:items-start lg:text-left lg:w-2/5">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {t("tech_stack")}
              </span>
              <h2 className={`${sectionTitle} mt-3`}>{t("tech_stack")}</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
                {t("tech_stack_text")}
              </p>
              <Link
                href="/about"
                className="mt-5 btn-fill inline-flex w-fit items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm font-medium text-text transition-all duration-200 hover:text-white"
              >
                {t("tech_stack_cta")}
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex items-center justify-center lg:w-3/5">
              <SkillsGrid
                skills={TECH_STACK_ICONS.map((s) => ({
                  ...s,
                  slug: toSlug(s.name),
                }))}
                linkPrefix="/technologies"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={`${section} reveal-scroll-up`}>
        <div className="mx-auto max-w-2xl">
          <div className={sectionCentered}>
            <span className={sectionLabel}>{t("contact_section_title")}</span>
            <h2 className={sectionTitle}>{t("contact_section_title")}</h2>
            <p className={sectionDesc}>{t("contact_section_desc")}</p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-8">
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-4 transition-all duration-200 hover:border-primary/50 hover:shadow-(--shadow-primary)">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FiMail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  Email
                </p>
                <p className="text-sm font-medium">
                  {t("contact_section_email")}
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="btn-glow inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-(--shadow-primary)"
            >
              {t("contact_section_cta")}
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
