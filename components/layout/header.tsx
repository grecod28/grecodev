"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import LanguageSelector from "@/components/i18n/languale-selector";
import ThemeSelector from "@/components/i18n/theme-selector";
import MobileMenu from "@/components/layout/mobile-menu";

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/technologies", label: t("technologies") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  // elimina el locale (/es, /en, etc.)
  const getPathWithoutLocale = (path: string) => {
    const segments = path.split("/");
    // ['', 'es', 'projects']
    if (segments.length > 1 && segments[1].length === 2) {
      return "/" + segments.slice(2).join("/");
    }
    return path;
  };

  const cleanPathname = getPathWithoutLocale(pathname);

  const isActive = (href: string) => {
    if (href === "/") return cleanPathname === "/";
    return cleanPathname.startsWith(href);
  };

  return (
    <header className="flex items-center justify-between max-w-260 w-full mt-16 mb-4 px-4">
      {/* Navegación de escritorio */}
      <nav className="hidden md:flex gap-6 text-lg">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors hover:text-primary ${
              isActive(link.href) ? "text-primary font-medium" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Acciones en escritorio */}
      <section className="hidden md:flex gap-4 text-lg">
        <LanguageSelector />
        <ThemeSelector />
      </section>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
