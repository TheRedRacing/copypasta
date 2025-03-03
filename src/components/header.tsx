import Link from "next/link";
import { HeaderAdd } from "@/components/add";
import ThemeOption from "./ThemeDialog";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { focusClassName } from "@/lib/focus";

export default function Header() {
    return (
        <header className="fixed top-4 inset-x-4 z-40 bg-white flex items-center justify-between border border-zinc-200 rounded-lg h-14 px-4 dark:bg-dark-header dark:border-none">
            <div className="flex items-center gap-2">
                <Link href="/" className={cn("text-xl font-bold flex items-center gap-2 -m-1 p-1 rounded-lg", focusClassName )}>
                    <span className="size-8 text-white flex items-center justify-center bg-primary-500 rounded-lg">
                        <ClipboardIcon className="size-4" />
                    </span>
                    <span>CopyPasta</span>
                </Link>
            </div>

            <div className="flex items-end gap-2">
                <HeaderAdd />
                <ThemeOption />
            </div>
        </header>
    );
}
