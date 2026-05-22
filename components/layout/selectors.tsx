import LanguageSelector from "@/components/i18n/languale-selector";
import ThemeSelector from "../i18n/theme-selector";

export default function Selectors() {
  return (
    <section className="flex gap-4 absolute top-4 right-4 text-lg">
      <LanguageSelector />
      <ThemeSelector />
    </section>
  );
}
