import Link from "next/link";
import { HeaderAdd } from "@/components/add";
import ThemeOption from "./ThemeDialog";

export default function Header() {
    return (
        <header className="fixed top-4 inset-x-4 z-40 bg-white flex items-center justify-between border border-zinc-200 rounded-lg h-14 px-4">
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
