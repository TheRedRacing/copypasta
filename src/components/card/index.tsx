import { cn } from "@/lib/utils";
import { PrivateButton, TrashButton } from "./button";
import { useState } from "react";
import EditDialog from "../edit";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clipboardItem } from "@/lib/types";

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
        <li key={index} ref={setNodeRef} className="relative flex-1 flex items-center justify-between border-y border-zinc-200 -my-px bg-white hover:bg-zinc-50 px-4" style={style} {...attributes}>
            <button type="button" className="flex-1 flex items-center justify-start pl-4 sm:pl-0 py-4" onClick={copyToClipboard}>
                <span className={cn(isBlur && "blur-sm", "text-left text-sm line-clamp-1")}>{data.text}</span>
            </button>
            <div className="flex shrink-0 items-center gap-2 py-2">
                <PrivateButton isBlur={isBlur} setIsBlur={setIsBlur} />
                <EditDialog item={data} />
                <TrashButton item={data} />
                <button type="button" className="flex items-center justify-center rounded-md px-4 py-2 bg-transparent hover:bg-cyan-50 text-xs font-medium text-zinc-600 hover:text-cyan-700 ring-1 ring-inset ring-zinc-500/10 hover:ring-cyan-600/10" {...listeners} ref={setActivatorNodeRef}>
                    <Bars3Icon className="size-5" />
                </button>
            </div>


            <div className={cn(isCopied ? "h-full opacity-100" : "h-0 opacity-0", "absolute inset-x-0 select-none flex items-center justify-center text-sm bg-green-50 text-green-600 transition-all duration-500 ease-in-out")}>
                Copied
            </div>
        </li>
    );
}