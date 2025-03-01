import { cn } from "@/lib/utils";
import { PrivateButton, TrashButton } from "./button";
import { useState } from "react";
import EditDialog from "../edit";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clipboardItem } from "@/lib/types";
import { ButtonCard } from "../ui/button";
import { track } from "@vercel/analytics";

interface CardProps {
    index: number;
    item: number;
    data: clipboardItem;
}

export default function Card({ index, item, data }: CardProps) {
    const [isBlur, setIsBlur] = useState(data.isPrivate);

    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(data.text);
            track("row copied");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Erreur de copie :", err);
        }
    }

    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({ id: item });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <li key={index} ref={setNodeRef} className="relative flex-1 flex items-center justify-between border border-zinc-200 -my-px bg-white hover:bg-zinc-50 px-4 dark:bg-dark-main dark:border-zinc-800 dark:hover:bg-dark-hover first:rounded-t-lg last:rounded-b-lg" style={style} {...attributes}>
            <button type="button" className="flex-1 flex items-center justify-start pl-4 sm:pl-0 py-4" onClick={copyToClipboard}>
                <span className={cn(isBlur && "blur-sm", "text-left text-sm line-clamp-1")}>{data.text}</span>
            </button>
            <div className="flex shrink-0 items-center gap-2 py-2">
                <PrivateButton isBlur={isBlur} setIsBlur={setIsBlur} />
                <EditDialog item={data} />
                <TrashButton item={data} />
                <ButtonCard {...listeners} ref={setActivatorNodeRef}>
                    <Bars3Icon className="size-5" />
                </ButtonCard>
            </div>


            <div className={cn(isCopied ? "h-full opacity-100" : "h-0 opacity-0", "absolute inset-x-0 select-none flex items-center justify-center text-sm bg-green-50 text-green-600 transition-all duration-500 ease-in-out")}>
                Copied
            </div>
        </li>
    );
}