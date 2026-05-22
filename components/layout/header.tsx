import Link from "next/link";
import LanguageSelector from "@/components/i18n/languale-selector";
import ThemeSelector from "@/components/i18n/theme-selector";

export default function Header() {
  return (
    <header className="flex items-center justify-between max-w-260 w-full mt-16 mb-4 px-4">
      <nav className="flex gap-4 text-lg">
        <Link href="/projects">Inicio</Link>
        <Link href="/projects">Proyectos</Link>
        <Link href="/tecnologies">Tecnologías</Link>
        <Link href="/profile">Profile</Link>
      </nav>

      <section className="flex gap-4 text-lg">
        <LanguageSelector />
        <ThemeSelector />
      </section>
    </header>
  );
}
