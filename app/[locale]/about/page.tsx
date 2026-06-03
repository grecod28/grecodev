import { getTranslations } from "next-intl/server";
import { FiArrowRight } from "react-icons/fi";
import {
  section,
  sectionCentered,
  sectionLabel,
  sectionTitle,
  bodyText,
  cardContent,
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

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <main className="flex flex-1 flex-col w-full">
      {/* Sobre mí */}
      <section className={section}>
        <div
          className="mx-auto max-w-4xl animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className={sectionCentered}>
            <span className={sectionLabel}>
              {t("about.title")}
            </span>
            <h2 className={sectionTitle}>
              {t("about.subtitle")}
            </h2>
          </div>

          <div className="mt-10 space-y-5">
            <p className={bodyText}>
              {t("about.p1")}
            </p>
            <p className={bodyText}>
              {t("about.p2")}
            </p>
            <p className={bodyText}>
              {t("about.p3")}
            </p>
          </div>
        </div>
      </section>

      {/* Estudios */}
      <section className={section}>
        <div
          className="mx-auto max-w-3xl animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <div className={sectionCentered}>
            <span className={sectionLabel}>
              {t("education.title")}
            </span>
            <h2 className={sectionTitle}>
              {t("education.subtitle")}
            </h2>
          </div>

          <div className="mt-10">
            <div className="relative border-l border-border pl-8">
              <div className="absolute -left-1.25 top-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />

              <div className={`${cardContent} hover:shadow-(--shadow-primary)`}>
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
          style={{ animationDelay: "400ms" }}
        >
          <div className={sectionCentered}>
            <span className={sectionLabel}>
              FAQ
            </span>
            <h2 className={sectionTitle}>
              {t("faq.title")}
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {FAQ_KEYS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-border bg-surface transition-all duration-200 open:border-primary/50 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium  transition-colors hover:text-primary">
                  {t(`faq.${q}`)}
                  <FiArrowRight className="h-4 w-4 shrink-0 text-text-muted transition-all duration-200 group-open:rotate-90 group-open:text-primary" />
                </summary>
                <div className="border-t border-border px-5 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-text-muted">
                    {t(`faq.${a}`)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
