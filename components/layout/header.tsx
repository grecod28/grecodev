import Link from "next/link";
import LanguageSelector from "@/components/i18n/languale-selector";
import ThemeSelector from "@/components/i18n/theme-selector";
import { getMessages, getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("Header");

  return (
    <header className="flex items-center justify-between max-w-260 w-full mt-16 mb-4 px-4">
      <nav className="flex gap-4 text-lg">
        <Link href="/projects">{t("home")}</Link>
        <Link href="/projects">{t("projects")}</Link>
        <Link href="/tecnologies">{t("technologies")}</Link>
        <Link href="/profile">{t("profile")}</Link>
      </nav>

      <section className="flex gap-4 text-lg">
        <LanguageSelector />
        <ThemeSelector />
      </section>
    </header>
  );
}
