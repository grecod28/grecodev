import { TECH_STACK_ICONS } from "@/lib/constants/icons";
import { PROJECTS } from "@/lib/constants/projects";
import { toSlug } from "@/lib/functions/slug";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FiArrowRight, FiMail } from "react-icons/fi";
import Reveal from "@/components/ui/reveal";
import {
  section,
  sectionCentered,
  sectionContainer,
  sectionLabel,
  sectionTitle,
  sectionDesc,
  btnPrimary,
  btnSecondary,
  btnLink,
  btnPrimarySimple,
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
      <Reveal>
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

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Santiago Greco
          </h1>

          <p className="mt-2 bg-linear-to-r from-primary to-accent bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
            {t("role")}
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
            {t("bio")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className={btnPrimary}
            >
              {t("cta_projects")}
            </Link>
            <Link
              href="/contact"
              className={btnSecondary}
            >
              {t("cta_contact")}
            </Link>
          </div>
        </div>
      </section>
      </Reveal>

      {/* ── Featured Projects ── */}
      <Reveal delay={100}>
      <section className={section}>
        <div className={sectionContainer}>
          <div className={sectionCentered}>
            <span className={sectionLabel}>
              {t("featured_title")}
            </span>
            <h2 className={sectionTitle}>
              {t("featured_title")}
            </h2>
            <p className={sectionDesc}>
              {t("featured_desc")}
            </p>
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
              className={btnLink}
            >
              {t("featured_cta")}
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      </Reveal>

      {/* ── Tech Stack ── */}
      <Reveal delay={200}>
      <section className={section}>
        <div className={sectionContainer}>
          <div className={sectionCentered}>
            <span className={sectionLabel}>
              {t("tech_stack")}
            </span>
            <h2 className={sectionTitle}>
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
                <div className={iconBoxSmall}>
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
      <section className={section}>
        <div className="mx-auto max-w-2xl">
          <div className={sectionCentered}>
            <span className={sectionLabel}>
              {t("contact_section_title")}
            </span>
            <h2 className={sectionTitle}>
              {t("contact_section_title")}
            </h2>
            <p className={sectionDesc}>
              {t("contact_section_desc")}
            </p>
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
              className={btnPrimarySimple}
            >
              {t("contact_section_cta")}
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      </Reveal>
    </main>
  );
}
