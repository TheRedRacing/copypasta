import type { Metadata } from "next";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/themeProvider";

import Cookies from "@/components/cookies";

import { Analytics } from "@vercel/analytics/react"

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Copypasta",
  description: "A simple clipboard manager",
  authors: [{ name: "Maxime Sickenberg" }],
  keywords: ["clipboard", "manager", "copy", "paste", "clipboard manager", "copypasta", "copy-pasta", "copy pasta"],
  creator: "Maxime Sickenberg",
  publisher: "Maxime Sickenberg"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(roboto.className, "")} suppressHydrationWarning>
      <body className="flex flex-col min-h-[100svh] antialiased bg-zinc-50 dark:bg-dark-main text-zinc-900 dark:text-zinc-100">
        <ThemeProvider defaultTheme="dark-orange" disableTransitionOnChange enableColorScheme enableSystem themes={["cyan", "dark-cyan", "red", "dark-red", "orange", "dark-orange", "yellow", "dark-yellow", "green", "dark-green", "teal", "dark-teal", "blue", "dark-blue", "indigo", "dark-indigo", "pink", "dark-pink"]}>
          <>
            {children}
            <Cookies />
          </>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
