import { cn } from "@/lib/utils";
import { CopyButton, PrivateButton, TrashButton } from "./button";
import { useState } from "react";

interface CardProps {
    index: number;
    item: {
        text: string;
        private: boolean;
    };
}
export default function Card({ index, item }: CardProps) {
    const [isBlur, setIsBlur] = useState(item.private);

    return (
        <div key={index} className="group relative flex items-center justify-center w-full aspect-square rounded-xl border border-zinc-300 overflow-hidden">
            <div className={cn(isBlur && 'blur-sm', 'whitespace-nowrap')}>{item.text}</div>
            <div className="absolute inset-2 flex flex-col gap-1 group-hover:opacity-100 opacity-0 transition-opacity ease-in-out duration-300">
                <CopyButton text={item.text} />
                <div className="flex-1 flex gap-1">
                    <PrivateButton isBlur={isBlur} setIsBlur={setIsBlur} />
                    <TrashButton id={index} />
                </div>
            </div>
        </div>
    )
}