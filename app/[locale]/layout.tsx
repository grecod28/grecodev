import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Grecodev | Portfolio Web FullStack",
  description:
    "Desarrollador Full Stack especializado en aplicaciones web modernas y escalables. Trabajo con tecnologías como Angular, Next.js, NestJS, TypeScript y Docker, creando soluciones eficientes, seguras y centradas en la experiencia de usuario, desde el frontend hasta el backend.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased bg-background text-text`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col items-center">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
