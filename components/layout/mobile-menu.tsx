"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

import LanguageSelector from "@/components/i18n/languale-selector";
import ThemeSelector from "@/components/i18n/theme-selector";

type LinkItem = {
  href: string;
  label: string;
};

type Props = {
  links: LinkItem[];
};

export default function MobileMenu({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Ícono hamburguesa */}
      <button
        onClick={toggleMenu}
        className="text-3xl z-50 relative"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Navegación */}
      <aside
        className={`
    fixed top-0 left-0 h-screen w-60
    bg-surface border-r border-border
    z-50
    transform transition-transform duration-300
    flex flex-col p-8 gap-8
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <nav className="flex flex-col gap-6 text-xl mt-16">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <section className="flex items-center gap-6 mt-auto text-2xl">
          <LanguageSelector />

          <ThemeSelector />
        </section>
      </aside>
    </>
  );
}
