import Link from "next/link";
import ThemeOption from "./ThemeDialog";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { focusClassName } from "@/lib/focus";
import { Button } from "./ui/button";
import AddButton from "@/components/add/addItem";
import Debug from "@/components/debug";

export default function Header() {
    return (
        <header className="fixed top-4 inset-x-4 z-40 bg-white flex items-center justify-between border border-zinc-200 rounded-lg h-14 px-4 dark:bg-dark-header dark:border-none">
            <div className="flex items-center gap-2">
                <div className="text-xl font-bold flex items-center gap-2 -m-1 p-1 rounded-lg">
                    <span className="size-8 text-white flex items-center justify-center bg-primary-500 rounded-lg">
                        <ClipboardIcon className="size-4" />
                    </span>
                    <span>CopyPasta</span>
                </div>
            </div>

            <div className="flex items-end gap-2">
                <AddButton />
                <ThemeOption />
                <Debug />
            </div>
        </header>
    );
}

export function SmallHeader() {
    return (
        <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-zinc-200 dark:bg-dark-header dark:border-none">
            <div className='mx-auto w-full max-w-6xl flex items-center justify-between gap-4 h-14 px-6 xl:px-0'>
                <div className="flex items-center gap-2">
                    <Link href="/" className={cn("text-xl font-bold flex items-center gap-2 -m-1 p-1 rounded-lg", focusClassName)}>
                        <span className="size-8 text-white flex items-center justify-center bg-primary-500 rounded-lg">
                            <ClipboardIcon className="size-4" />
                        </span>
                        <span>CopyPasta</span>
                    </Link>

                </div>

                <div className="flex items-end gap-2">
                    <Button size={'sm'} asChild>
                        <Link href="/">Dashboard</Link>
                    </Button>
                    <Button size={'sm'} variant={"outline"} asChild>
                        <Link href="/contact">Contact</Link>
                    </Button>
                    <ThemeOption />
                </div>
            </div>
        </header>
    );
}
