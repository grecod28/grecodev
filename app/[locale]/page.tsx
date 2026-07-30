import { TECH_STACK_ICONS } from "@/lib/constants/icons";
import { PROJECTS } from "@/lib/constants/projects";
import { toSlug } from "@/lib/functions/slug";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FiArrowRight, FiMail } from "react-icons/fi";
import Reveal from "@/components/ui/reveal";
import CanvasDots from "@/components/hero/canvas-dots";
import {
  section,
  sectionCentered,
  sectionContainer,
  sectionLabel,
  sectionTitle,
  sectionDesc,
  cardHover,
  iconBoxLarge,
  iconBoxSmall,
  contactInfoBox,
} from "@/lib/constants/styles";

const featuredProjects = PROJECTS.filter((p) => p.featured);

export default async function Home() {
  const t = await getTranslations("Index");
  const projectT = await getTranslations("Projects");

  return (
    <main className="flex flex-1 flex-col items-center w-full">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center w-full min-h-dvh px-4 sm:px-6 -mt-16">
        <CanvasDots />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          <div
            className="animate-fade-in-up relative mb-8"
            style={{ animationDelay: "100ms" }}
          >
            <div
              className="absolute -inset-6 rounded-full bg-primary/20 blur-3xl animate-float"
              aria-hidden="true"
            />
            <div
              className="absolute -inset-2 rounded-full bg-linear-to-r from-primary via-accent to-primary opacity-30 blur-xl animate-float"
              aria-hidden="true"
              style={{ animationDelay: "500ms" }}
            />
            <Image
              src="/images/foto_perfil.png"
              alt="Santiago Greco"
              width={140}
              height={140}
              className="relative rounded-full object-cover ring-4 ring-primary/30 shadow-(--shadow-primary)"
              priority
            />
          </div>

          <h1
            className="animate-fade-in-left text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "300ms" }}
          >
            Santiago Greco
          </h1>

          <p
            className="mt-3 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-xl font-semibold text-transparent sm:text-2xl lg:text-3xl bg-size-[200%_200%] animate-gradient"
            style={{ animationDelay: "500ms" }}
          >
            {t("role")}
          </p>

          <p
            className="animate-fade-in-up mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
            style={{ animationDelay: "700ms" }}
          >
            {t("bio")}
          </p>

          <div
            className="animate-scale-in mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "900ms" }}
          >
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

      {/* ── Featured Projects ── */}
      <Reveal delay={100}>
        <section className={section}>
          <div className={sectionContainer}>
            <div className={sectionCentered}>
              <span className={sectionLabel}>{t("featured_title")}</span>
              <h2 className={sectionTitle}>{t("featured_title")}</h2>
              <p className={sectionDesc}>{t("featured_desc")}</p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {featuredProjects.map((project) => {
                const Icon = project.icon;

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className={`${cardHover} min-h-65 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`}
                  >
                    <div className={`${iconBoxLarge} text-text-muted`}>
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold">
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
                className="btn-fill inline-flex items-center gap-2 rounded-lg border border-border-strong px-6 py-3 text-sm font-medium text-text transition-all duration-200 hover:text-white"
              >
                {t("featured_cta")}
                <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Tech Stack ── */}
      <Reveal delay={200}>
        <section className={`${section} bg-surface`}>
          <div className={sectionContainer}>
            <div className={sectionCentered}>
              <span className={sectionLabel}>{t("tech_stack")}</span>
              <h2 className={sectionTitle}>{t("tech_stack")}</h2>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              {TECH_STACK_ICONS.map(({ name, src }) => (
                <Link
                  key={name}
                  href={`/technologies/${toSlug(name)}`}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className={`${iconBoxSmall} ring-1 ring-border transition-shadow duration-200 group-hover:shadow-(--shadow-primary)`}
                  >
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
      </Reveal>

      {/* ── Contact ── */}
      <Reveal delay={300}>
        <section className={`${section} bg-surface`}>
          <div className="mx-auto max-w-2xl">
            <div className={sectionCentered}>
              <span className={sectionLabel}>{t("contact_section_title")}</span>
              <h2 className={sectionTitle}>{t("contact_section_title")}</h2>
              <p className={sectionDesc}>{t("contact_section_desc")}</p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-6">
              <div className={contactInfoBox}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-light">
                  <FiMail className="h-5 w-5 text-text-muted" />
                </div>
                <span className="text-sm font-medium">
                  {t("contact_section_email")}
                </span>
              </div>

              <Link
                href="/contact"
                className="btn-fill inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:shadow-(--shadow-primary)"
              >
                {t("contact_section_cta")}
                <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
