import Link from "next/link";
import { HeaderAdd } from "@/components/add";
import ThemeOption from "./ThemeDialog";

export default function Header() {
    return (
        <header className="sticky top-0 inset-x-0 z-40 bg-white flex items-center justify-between border-b border-zinc-300 h-14 px-4 sm:px-10 lg:px-16">
            <div className="flex items-end gap-2">
                <Link href="/" className="font-bold">
                    <span>CopyPasta</span>
                </Link>
                <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-600 ring-1 ring-inset ring-primary-500/10">
                    V.1.0.6
                </span>
            </div>

            <div className="flex items-end gap-2">
                <HeaderAdd />
                <ThemeOption />
            </div>
        </header>
    );
}
