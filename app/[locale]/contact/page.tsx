import { getTranslations } from "next-intl/server";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

const CONTACT_ITEMS = [
  { key: "email", icon: FiMail, href: "mailto:stgrecodev@gmail.com" },
  { key: "github", icon: FiGithub, href: "https://github.com/grecod28" },
  {
    key: "linkedin",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/santiago-greco-dominguez-681588348",
  },
  { key: "location", icon: FiMapPin, href: null },
] as const;

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  return (
    <section className="w-full border-t border-border px-4 py-20">
      <div
        className="mx-auto max-w-4xl animate-fade-in"
        style={{ animationDelay: "500ms" }}
      >
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {t("cta")}
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("title")}</h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted">
            {t("description")}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {CONTACT_ITEMS.map(({ key, icon: Icon, href }) => {
            const value = t(`${key}`);
            const isLink = href !== null;

            const content = (
              <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-(--shadow-primary)">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-light transition-colors group-hover:bg-primary/10">
                  <Icon className="h-5 w-5 text-text-muted transition-colors group-hover:text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    {key}
                  </p>

                  <p className="mt-0.5 truncate text-sm font-medium">{value}</p>
                </div>
              </div>
            );

            const wrapperClass =
              "group block flex-1 min-w-[260px] max-w-[320px]";

            if (isLink) {
              const isExternal = href.startsWith("http");

              return (
                <a
                  key={key}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={wrapperClass}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={key} className={wrapperClass}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="mailto:hello@santiagogreco.dev"
            className="text-white inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-medium transition-all duration-200 hover:bg-primary-hover hover:shadow-(--shadow-primary)"
          >
            {t("cta")}
            <FiArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
