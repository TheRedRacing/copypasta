"use client";

import changelog from "@/changelog.json";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function Footer() {
    return (
        <footer className="bg-white flex flex-col gap-4 border-t border-zinc-200 pt-4 p-8 dark:bg-dark-header dark:border-none">
            <div className="flex items-center justify-between gap-4">
                <FooterContent />
            </div>
            <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()}, Maxime Sickenberg.</p>
        </footer>
    );
}

export function SmallFooter() {
    return (
        <footer className="bg-white border-t border-zinc-200 pt-4 p-8 dark:bg-dark-header dark:border-none">
            <div className="mx-auto w-full max-w-6xl flex flex-col gap-4 px-6 xl:px-0">
                <div className="flex items-center justify-between gap-4">
                    <FooterContent />
                </div>
                <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()}, Maxime Sickenberg.</p>
            </div>
        </footer>
    );
}

// When website is live, replace the following line with the one below :
// <Link href={"https://msickenberg.ch"} target='_blank' className='hover:text-red-500 hover:underline'>Maxime Sickenberg</Link>

function FooterContent() {
    return (
        <>
            <div className="flex items-center">
                <span className="size-6 text-white flex items-center justify-center bg-primary-500 rounded">
                    <ClipboardIcon className="size-4" />
                </span>
                <div className="flex items-center">
                    <NavLink href={"/"}>Home</NavLink>
                    <span className="size-1 bg-zinc-400 rounded-full"></span>
                    <NavLink href={"/faq"}>F.A.Q</NavLink>
                    <span className="size-1 bg-zinc-400 rounded-full"></span>
                    <NavLink href={"/contact"}>Contact</NavLink>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={"green"} className="hover:opacity-90">
                    <Link href="/changelog">Changelog {changelog.current_version}</Link>
                </Badge>

                <Button size={"i8"} variant={"outline"} asChild>
                    <Link href={"https://github.com/TheRedRacing/copypasta"} target="_blank">
                        <span className="sr-only">Github</span>
                        <svg fill="currentColor" viewBox="0 0 24 24" className="size-6">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </Button>
            </div>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={cn(isActive ? "text-primary-500 underline" : "text-zinc-600 dark:text-zinc-400", "px-4 py-2 text-sm hover:underline underline-offset-4 hover:text-primary-500  dark:hover:text-primary-500")}>
            {children}
        </Link>
    );
}
