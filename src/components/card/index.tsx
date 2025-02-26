import { cn } from "@/lib/utils";
import { PrivateButton, TrashButton } from "./button";
import { useState } from "react";
import EditDialog from "../edit";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { clipboardItem } from "@/lib/types";

interface CardProps {
    index: number;
    item: clipboardItem;
}

const classNormal = "relative flex-1 flex items-center justify-between border-y border-zinc-200 -my-px bg-white hover:bg-zinc-50";

export default function Card({ index, item }: CardProps) {
    const [isBlur, setIsBlur] = useState(item.isPrivate);

    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(item.text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Erreur de copie :", err);
        }
    }

    const { ref, handleRef } = useSortable({ id:item.id, index, modifiers: [RestrictToVerticalAxis] });

    return (
        <li key={item.id} ref={ref} className={classNormal}>
            <div className={cn(isCopied ? "h-full opacity-100" : "h-0 opacity-0", "absolute inset-x-0 select-none flex items-center justify-center text-sm bg-green-50 text-green-600 transition-all duration-500 ease-in-out")}>
                Copied
            </div>
            <button type="button" className="hidden sm:w-6 lg:w-12 sm:flex items-center justify-center mx-4 my-2 py-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/80 rounded-md" ref={handleRef}>
                <Bars3Icon className="size-5" />
            </button>
            <button type="button" className="flex-1 flex items-center justify-start pl-4 sm:pl-0 py-4" onClick={copyToClipboard}>
                <span className={cn(isBlur && "blur-sm", "text-left text-sm line-clamp-1")}>{item.text}</span>
            </button>
            <div className="flex shrink-0 items-center gap-2 py-2 pr-4 sm:pr-10 lg:pr-16">
                <PrivateButton isBlur={isBlur} setIsBlur={setIsBlur} />
                <EditDialog item={item} />
                <TrashButton id={item.id} />
            </div>
        </li>
    );
}