import linguiConfig from '../../../lingui.config'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import {cn} from "@/lib/utils";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";
import {PropsWithChildren} from "react";
import {initLingui, PageLangParam} from "@/i18n/initLingui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  title: "TB Wallet - The Future of Cryptocurrency Management",
  description: "Experience the future of cryptocurrency management with TB Wallet. Secure, fast, and user-friendly platform for all your digital assets.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<PropsWithChildren<PageLangParam>>) {
  const lang = (await params).lang

  return (
    <html lang={lang} className={cn('w-full overflow-x-hidden scroll-smooth antialiased lowercase', geistSans.variable, geistMono.variable)} suppressHydrationWarning>
      <body
        className={cn(
          'antialiased',
          'relative min-h-screen pl-[calc(100vw-100%)]',
          'flex flex-col',
          'bg-white text-neutral-900',
          'dark:bg-dark dark:text-gray-100',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="mb-auto grow">{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
