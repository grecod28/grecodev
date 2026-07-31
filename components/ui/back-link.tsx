"use client";

import { useRouter } from "@/i18n/navigation";
import { backLink } from "@/lib/constants/styles";
import { useTranslations } from "next-intl";

interface BackLinkProps {
  label?: string;
  className?: string;
}

export default function BackLink({ label, className = "" }: BackLinkProps) {
  const router = useRouter();
  const t = useTranslations("Common");

  return (
    <button
      className={`${backLink} ${className}`}
      onClick={() => router.back()}
    >
      <span aria-hidden="true">&larr;</span>
      {label || t("back")}
    </button>
  );
}
