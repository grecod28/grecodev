import { getTranslations } from "next-intl/server";
import { FiMail, FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";
import { section, sectionLabel, sectionTitle } from "@/lib/constants/styles";
import ContactForm from "@/components/contact/contact-form";

const SOCIAL_LINKS = [
  {
    key: "github",
    icon: FiGithub,
    href: "https://github.com/grecod28",
    label: "GitHub",
  },
  {
    key: "linkedin",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/santiago-greco-dominguez",
    label: "LinkedIn",
  },
  {
    key: "email",
    icon: FiMail,
    href: "mailto:stgrecodev@gmail.com",
    label: "Email",
  },
] as const;

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  return (
    <section className={section}>
      <div className="mx-auto grid max-w-6xl gap-14 animate-fade-in lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col justify-center">
          <span className={sectionLabel}>{t("cta")}</span>
          <h1 className={sectionTitle}>{t("title")}</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
            {t("description")}
          </p>

          <ul className="mt-10 space-y-4">
            <li>
              <a
                href={`mailto:${t("email")}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:border-primary/50 hover:bg-surface-light"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FiMail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    {t("info_email")}
                  </p>
                  <p className="truncate text-sm font-medium text-text">
                    {t("email")}
                  </p>
                </div>
              </a>
            </li>
            <li>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FiMapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    {t("info_location")}
                  </p>
                  <p className="text-sm font-medium text-text">
                    {t("location")}
                  </p>
                </div>
              </div>
            </li>
          </ul>

          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("info_follow")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.key !== "email" ? "_blank" : undefined}
                  rel={item.key !== "email" ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
