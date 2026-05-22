"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSelector() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = () => {
    const newLocale = locale === "es" ? "en" : "es";

    router.replace(pathname, {
      locale: newLocale,
    });
  };

  return (
    <button onClick={changeLanguage}>{locale === "es" ? "EN" : "ES"}</button>
  );
}
