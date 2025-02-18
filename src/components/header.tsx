import Link from "next/link";
import { HeaderAdd } from "@/components/add";

export default function Header() {
    return (
        <header className="sticky top-0 inset-x-0 z-40 bg-white flex items-center justify-between border-b border-zinc-300 h-14 px-4 sm:px-10 lg:px-16">
            <div className="flex">
                <Link href="/" className="font-bold">
                    <span>PMI - CopyPasta</span>
                </Link>
            </div>

            <div className="flex items-center">
                <HeaderAdd />
            </div>
        </header>
    );
}