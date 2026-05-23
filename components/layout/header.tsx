import Link from "next/link";
import LanguageSelector from "@/components/i18n/languale-selector";
import ThemeSelector from "@/components/i18n/theme-selector";
import MobileMenu from "@/components/layout/mobile-menu";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("Header");

  const links = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/technologies", label: t("technologies") },
    { href: "/profile", label: t("profile") },
  ];

  return (
    <header className="flex items-center justify-between max-w-260 w-full mt-16 mb-4 px-4">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-lg">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Desktop Actions */}
      <section className="hidden md:flex gap-4 text-lg">
        <LanguageSelector />
        <ThemeSelector />
      </section>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
