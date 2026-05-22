import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Selectors from "@/components/layout/selectors";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["900", "500", "300"],
});

export const metadata: Metadata = {
  title: "Grecodev | Portfolio Web FullStack",
  description:
    "Desarrollador Full Stack especializado en aplicaciones web modernas y escalables. Trabajo con tecnologías como Angular, Next.js, NestJS, TypeScript y Docker, creando soluciones eficientes, seguras y centradas en la experiencia de usuario, desde el frontend hasta el backend.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  let messages;
  try {
    messages = (await import(`../../i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${inter.variable}  h-full antialiased bg-background text-text`}
    >
      <body className="min-h-full flex flex-col items-center">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Selectors />
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
