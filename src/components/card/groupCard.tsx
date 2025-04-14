'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { clipboardGroup } from "@/lib/clipboardStorage";
import { motion } from "framer-motion";

interface GroupCardProps {
    index: number;
    lastIndex: number;
    group: clipboardGroup;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    onDelete: (groupId: number) => void;
    onRename: (groupId: number, newTitle: string) => void;
    children?: React.ReactNode;
}

export default function GroupCard({ index, lastIndex, group, onMoveUp, onMoveDown, onDelete, onRename, children }: GroupCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(group.title);

    const handleRename = () => {
        const trimmed = title.trim();
        if (trimmed && trimmed !== group.title) {
            onRename(group.id, trimmed);
        }
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border border-zinc-200 -my-px bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 rounded-lg"
        >
            <div className="flex items-center justify-between px-4 py-1.5 bg-white rounded-t-lg border-b border-zinc-200 dark:bg-dark-header dark:border-zinc-800">
                {isEditing ? (
                    <input
                        className="text-xs text-zinc-600 dark:text-zinc-100 bg-transparent border-b border-zinc-300 focus:outline-none focus:border-black dark:focus:border-white"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        autoFocus
                    />
                ) : (
                    <h2 className="text-xs text-zinc-600 dark:text-zinc-100">{group.title || "Untitled"}</h2>
                )}
                <div className="flex items-center gap-1">
                    <Button variant={'outline'} size="g" onClick={() => onMoveUp(index)} disabled={index === 0}>
                        <ChevronUpIcon className="size-3" />
                    </Button>
                    <Button variant={'outline'} size="g" onClick={() => onMoveDown(index)} disabled={index === lastIndex}>
                        <ChevronDownIcon className="size-3" />
                    </Button>
                    <span className="mx-1 h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                    <Button variant={'outline'} size="g" onClick={() => setIsEditing(true)}>
                        <PencilIcon className="size-3" />
                    </Button>
                    <Button variant="destructive" size="g" onClick={() => onDelete(group.id)}>
                        <XMarkIcon className="size-3" />
                    </Button>
                </div>
            </div>
            <div className="min-h-10">{children}</div>
        </motion.div>
    );
}