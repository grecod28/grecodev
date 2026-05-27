import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased bg-background text-text`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col items-center">{children}</body>
    </html>
  );
}
