import { TECH_ICONS } from "@/lib/constants/icons";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const t = await getTranslations("Index");

  return (
    <main className="flex flex-1 flex-col items-center justify-center w-full px-4">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <div className="relative mb-6">
          <div
            className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl"
            aria-hidden="true"
          />
          <Image
            src="/images/foto_perfil.jpg"
            alt="Santiago Greco"
            width={120}
            height={120}
            className="relative rounded-full object-cover ring-4 ring-border-strong shadow-surface"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Santiago Greco
        </h1>

        <p className="mt-2 bg-linear-to-r from-primary to-accent bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
          {t("role")}
        </p>

        <p className="mt-4 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
          {t("bio")}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium  transition-all duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-white"
          >
            {t("cta_projects")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-border-strong px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("cta_contact")}
          </Link>
        </div>

        <div className="mt-16">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {t("tech_stack")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {TECH_ICONS.map(({ name, src }) => (
              <div
                key={name}
                className="group flex flex-col items-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-light p-2.5 transition-colors duration-200 group-hover:bg-primary/10">
                  <Image
                    src={src}
                    alt={name}
                    width={28}
                    height={28}
                    className="h-7 w-7"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] font-medium text-text-muted">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
