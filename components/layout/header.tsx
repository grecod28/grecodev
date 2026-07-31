"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import LanguageSelector from "@/components/i18n/languale-selector";
import MobileMenu from "@/components/layout/mobile-menu";

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/technologies", label: t("technologies") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const getPathWithoutLocale = (path: string) => {
    const segments = path.split("/");
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
    <header
      className={`nav-overlay flex items-center justify-between w-full px-6 py-4 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      {/* Navegación de escritorio */}
      <nav className="hidden xl:flex xl:gap-8 text-base">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative transition-colors hover:text-primary ${
              isActive(link.href)
                ? "text-primary font-semibold"
                : "text-text-muted"
            }`}
          >
            {link.label}
            {isActive(link.href) && (
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
            )}
          </Link>
        ))}
      </nav>

      {/* Acciones en escritorio */}
      <section className="hidden xl:flex items-center gap-5 text-lg">
        <LanguageSelector />
      </section>

      {/* Mobile */}
      <div className="xl:hidden">
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
