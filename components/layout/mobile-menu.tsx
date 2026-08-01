"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import LanguageSelector from "@/components/i18n/languale-selector";

type LinkItem = {
  href: string;
  label: string;
};

type Props = {
  links: LinkItem[];
};

export default function MobileMenu({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClick(e: Event) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-3xl z-50 relative"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-dvh w-64 bg-surface border-r border-border z-50 transform transition-transform duration-300 flex flex-col p-8 gap-8 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
        </section>
      </aside>
    </>
  );
}
