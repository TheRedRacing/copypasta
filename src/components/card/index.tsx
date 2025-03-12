import { cn } from "@/lib/utils";
import { ArchiveButton, PrivateButton, TrashButton, UnArchiveButton } from "./button";
import { useState } from "react";
import EditDialog from "../edit";

import { useSortable } from '@dnd-kit/sortable';
import { clipboardItem } from "@/lib/types";
import { ButtonCard } from "../ui/button";
import { focusClassName } from "@/lib/focus";
import { CSS } from "@dnd-kit/utilities";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@next/third-parties/google";

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
            sendGAEvent('event', 'copy', 'row');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Erreur de copie :", err);
        }
    }

    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef, isDragging } = useSortable({ id: item });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: isDragging ? "relative" : "relative",
        zIndex: isDragging ? 20 : 0,
    };

    attributes.tabIndex = -1;

    return (
        <li key={index} ref={setNodeRef} className={cn("relative flex-1 flex items-stretch justify-between border border-zinc-200 -my-px pr-4 bg-white hover:bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 dark:hover:bg-dark-hover first:rounded-t-lg last:rounded-b-lg overflow-hidden", focusClassName)} style={style} {...attributes}>
            <ButtonCard {...listeners} ref={setActivatorNodeRef} className="flex items-center justify-center w-8 h-8 p-1 m-2 hover:bg-zinc-100 dark:hover:bg-dark-hover rounded-lg cursor-ns-resize">
                <Bars3Icon className="size-5" />
            </ButtonCard>
            <div className="flex-1 truncate flex items-center justify-start pl-4 sm:pl-0 py-2" onClick={copyToClipboard}>
                <span className={cn(isBlur && "blur-sm", "text-left text-sm")}>{data.text}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2 pl-2 py-2">
                <PrivateButton isBlur={isBlur} setIsBlur={setIsBlur} />
                <EditDialog item={data} />
                <ArchiveButton item={data} />
            </div>

            <div className={cn(isCopied ? "opacity-100 h-full" : "opacity-0 h-0", "absolute inset-x-0 top-1/2 -translate-y-1/2 select-none flex items-center justify-center text-sm bg-green-50 text-green-700 dark:bg-[#142118] dark:text-green-400 transition-all duration-500 ease-in-out")}>
                Copied
            </div>
        </li>
    );
}

export function ArchivedCard({ index, item, data }: CardProps) {
    const [isBlur, setIsBlur] = useState(data.isPrivate);

    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(data.text);
            sendGAEvent('event', 'copy', 'row');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Erreur de copie :", err);
        }
    }

    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef, isDragging } = useSortable({ id: item });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: isDragging ? "relative" : "relative",
        zIndex: isDragging ? 20 : 0,
    };

    attributes.tabIndex = -1;

    return (
        <li key={index} ref={setNodeRef} className={cn("relative flex-1 flex items-stretch justify-between border border-zinc-200 -my-px pr-4 bg-white hover:bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 dark:hover:bg-dark-hover first:rounded-t-lg last:rounded-b-lg overflow-hidden", focusClassName)} style={style} {...attributes}>
            <ButtonCard {...listeners} ref={setActivatorNodeRef} className="flex items-center justify-center w-8 h-8 p-1 m-2 hover:bg-zinc-100 dark:hover:bg-dark-hover rounded-lg cursor-ns-resize">
                <Bars3Icon className="size-5" />
            </ButtonCard>
            <div className="flex-1 relative truncate flex items-center justify-start pl-4 sm:pl-0 py-2" onClick={copyToClipboard}>
                <span className={cn(isBlur && "blur-sm", "text-left text-sm")}>{data.text}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2 pl-2 py-2">
                <PrivateButton isBlur={isBlur} setIsBlur={setIsBlur} />
                <EditDialog item={data} />
                <UnArchiveButton item={data} />
                <TrashButton item={data} />
            </div>

            <div className={cn(isCopied ? "opacity-100 h-full" : "opacity-0 h-0", "absolute inset-x-0 top-1/2 -translate-y-1/2 select-none flex items-center justify-center text-sm bg-green-50 text-green-700 dark:bg-[#142118] dark:text-green-400 transition-all duration-500 ease-in-out")}>
                Copied
            </div>
        </li>
    );
}
