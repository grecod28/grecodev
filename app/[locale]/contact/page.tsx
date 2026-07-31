import { getTranslations } from "next-intl/server";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import {
  section,
  sectionCentered,
  sectionLabel,
  sectionTitle,
} from "@/lib/constants/styles";
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
    href: "https://linkedin.com/in/santiago-greco-dominguez-681588348",
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
      <div className="mx-auto max-w-4xl animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className={sectionCentered}>
          <span className={sectionLabel}>{t("cta")}</span>
          <h2 className={sectionTitle}>{t("title")}</h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <ContactForm />
        </div>

        <div className="mt-12 border-t border-border pt-10">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {t("location")}
          </p>

          <div className="mt-6 flex items-center justify-center gap-6">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                target={item.key !== "email" ? "_blank" : undefined}
                rel={item.key !== "email" ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-110"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-light transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary">
                  <item.icon className="h-6 w-6 text-text-muted transition-colors group-hover:text-primary" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted transition-colors group-hover:text-primary">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
