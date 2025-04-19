import { cn } from "@/lib/utils";
import { useState } from "react";

import { useSortable } from '@dnd-kit/sortable';
import { focusClassName } from "@/lib/focus";
import { CSS } from "@dnd-kit/utilities";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import EditButton from "@/components/clipboard/edit";
import { clipboardItem } from "@/type/clipboard";

interface ClipboardCardProps {
    item: clipboardItem
    index: number
    groupId: string
}

export default function ClipboardCard({ item, index, groupId }: ClipboardCardProps) {
    const [isBlur, setIsBlur] = useState(item.isPrivate);

    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(item.text);
            sendGAEvent('event', 'copy', 'row');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Erreur de copie :", err);
        }
    }

    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef, isDragging } = useSortable({ id: item.id });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: isDragging ? "relative" : "relative",
        zIndex: isDragging ? 20 : 0,
    };

    attributes.tabIndex = -1;

    return (
        <li key={index} ref={setNodeRef} className={cn("relative flex-1 flex items-stretch justify-between pr-4 bg-white hover:bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 dark:hover:bg-dark-hover last:rounded-b-lg", focusClassName)} style={style} {...attributes}>
            <Button variant={'outline'} size={'i8'} {...listeners} ref={setActivatorNodeRef} className="flex items-center justify-center w-8 h-8 p-1 m-2 hover:bg-zinc-100 dark:hover:bg-dark-hover rounded-lg cursor-ns-resize">
                <Bars3Icon className="size-5" />
            </Button>
            <div className="flex-1 truncate flex items-center justify-start pl-4 sm:pl-0 py-2" onClick={copyToClipboard}>
                <span className={cn(isBlur && "blur-sm", "text-left text-sm")}>{item.text}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2 pl-2 py-2">

                <EditButton item={item} groupId={groupId} />

            </div>

            <div className={cn(isCopied ? "opacity-100 h-full" : "opacity-0 h-0", "absolute inset-x-0 top-1/2 -translate-y-1/2 select-none flex items-center justify-center text-sm bg-green-50 text-green-700 dark:bg-[#142118] dark:text-green-400 transition-all duration-500 ease-in-out")}>
                Copied
            </div>
        </li>
    );
}
