import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Legal() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="link" className="px-4 py-2 text-sm text-zinc-600 hover:underline hover:text-primary-500 dark:text-zinc-400 dark:hover:text-primary-500">
                    Legal
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={5}>
                <DropdownMenuItem>
                    <Link href="/terms">Terms of use</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/cookie-policy">Cookie Policy</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
