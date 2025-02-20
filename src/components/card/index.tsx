import { cn } from "@/lib/utils";
import { PrivateButton, TrashButton } from "./button";
import { useState } from "react";
import EditDialog from "../edit";
import { Bars3Icon } from "@heroicons/react/24/outline";


/* 
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'; 
*/

interface CardProps {
    index: number;
    item: {
        id: number;
        text: string;
        private: boolean;
    };
}

const classNormal = "group/card flex-1 flex items-center justify-between border-y border-zinc-200 -my-px bg-white hover:bg-zinc-50";
const classCopied = "group/card flex-1 flex items-center justify-between border-y border-zinc-200 -my-px bg-green-50 text-green-600";

export default function Card({ index, item }: CardProps) {
    const [isBlur, setIsBlur] = useState(item.private);

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

    //const { ref, handleRef } = useSortable({ id: item.id, index, modifiers: [RestrictToVerticalAxis] });

    return (
        <li key={index} /* ref={ref} */ className={cn(isCopied ? classCopied : classNormal)}>
            <button className="hidden sm:w-10 lg:w-16 sm:flex items-center justify-center py-4 text-zinc-400 hover:text-zinc-900" /* ref={handleRef} */>
                <Bars3Icon className="size-5 hidden" />
            </button>
            <button className="flex-1 flex items-center justify-start pl-4 sm:pl-0 py-4" onClick={copyToClipboard}>
                {isCopied ? (
                    <span className="text-sm">Copied</span>
                ) : (
                    <span className={cn(isBlur && "blur-sm", "text-left text-sm line-clamp-1")}>{item.text}</span>
                )}
            </button>
            <div className="flex shrink-0 items-center gap-2 py-2 pr-4 sm:pr-10 lg:pr-16">
                <PrivateButton isBlur={isBlur} setIsBlur={setIsBlur} />
                <EditDialog id={index} text={item.text} isPrivate={item.private} />
                <TrashButton id={index} />
            </div>
        </li>
    );
}