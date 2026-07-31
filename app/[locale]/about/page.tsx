import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { TECH_STACK_ICONS } from "@/lib/constants/icons";
import { toSlug } from "@/lib/functions/slug";
import SkillsGrid from "@/components/ui/skills-grid";
import FAQ from "@/components/ui/faq";
import {
  section,
  sectionContainer,
  sectionCentered,
  sectionLabel,
  sectionTitle,
} from "@/lib/constants/styles";

const FAQ_KEYS = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
  { q: "q4", a: "a4" },
  { q: "q5", a: "a5" },
  { q: "q6", a: "a6" },
  { q: "q7", a: "a7" },
] as const;

const SKILLS_WITH_SLUGS = TECH_STACK_ICONS.map((s) => ({
  ...s,
  slug: toSlug(s.name),
}));

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <main className="flex flex-1 flex-col w-full">
      {/* ── Profile + Skills ── */}
      <section className={section}>
        <div
          className={`${sectionContainer} animate-fade-in`}
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
            {/* Left — Profile */}
            <div className="flex w-full flex-col items-center text-center lg:w-1/2">
              <div className="mb-6">
                <div className="relative">
                  <div
                    className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl"
                    aria-hidden="true"
                  />
                  <Image
                    src="/images/foto_perfil.png"
                    alt="Santiago Greco"
                    width={160}
                    height={160}
                    className="relative rounded-full object-cover ring-4 ring-primary/30 shadow-(--shadow-primary)"
                    priority
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                {t("about.subtitle")}
              </h2>

              <div className="mt-6 space-y-4">
                <p className="text-base leading-relaxed text-text-muted">
                  {t("about.p1")}
                </p>
                <p className="text-base leading-relaxed text-text-muted">
                  {t("about.p2")}
                </p>
                <p className="text-base leading-relaxed text-text-muted">
                  {t("about.p3")}
                </p>
              </div>
            </div>

            {/* Right — Skills */}
            <div className="flex flex-col items-center lg:w-1/2">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
                Tech Stack
              </h3>
              <SkillsGrid
                skills={SKILLS_WITH_SLUGS}
                linkPrefix="/technologies"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className={section}>
        <div
          className="mx-auto max-w-3xl animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <div className={sectionCentered}>
            <span className={sectionLabel}>{t("education.title")}</span>
            <h2 className={sectionTitle}>{t("education.subtitle")}</h2>
          </div>

          <div className="mt-10">
            <div className="relative border-l border-border pl-8">
              <div className="absolute -left-1.25 top-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />

              <div className="rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-(--shadow-primary)">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {t("education.degree")}
                  </h3>
                  <span className="text-xs font-medium text-primary">
                    {t("education.period")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-primary">
                  {t("education.institution")} &middot;{" "}
                  {t("education.location")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {t("education.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={section}>
        <div
          className="mx-auto max-w-3xl animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <div className={sectionCentered}>
            <span className={sectionLabel}>FAQ</span>
            <h2 className={sectionTitle}>{t("faq.title")}</h2>
          </div>

          <div className="mt-10">
            <FAQ
              items={FAQ_KEYS.map(({ q, a }) => ({
                question: t(`faq.${q}`),
                answer: <p className="text-sm leading-relaxed text-text-muted">{t(`faq.${a}`)}</p>,
              }))}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
