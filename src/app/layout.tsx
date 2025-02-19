import type { Metadata } from "next";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Cookies from "@/components/cookies";
import Footer from "@/components/footer";

import { Analytics } from "@vercel/analytics/react"

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PMI - Copypasta",
  description: "A simple clipboard manager",
  authors: [{name: "Maxime Sickenberg"}],
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, "flex flex-col min-h-screen antialiased")}>
        <Header />
        {children}
        <Cookies />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
