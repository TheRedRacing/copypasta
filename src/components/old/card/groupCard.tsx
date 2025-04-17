"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    PencilIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { clipboardGroup } from "@/type/clipboard";

interface GroupCardProps {
    groupId: string;
    children?: React.ReactNode;
}

export default function GroupCard({
    groupId,
    children,
}: GroupCardProps) {
    const group: clipboardGroup = {
        id: groupId,
        title: "Default",
        items: [],
    };

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(group.title);

    const isDefault = group.title === "Default";

    const handleRename = () => {
        const trimmed = title.trim();
        if (trimmed && trimmed !== group.title) {
            // Rename the group
        }
        setIsEditing(false);
    };

    return (
        <motion.li
            layout
            transition={{ type: "spring", stiffness: 300, damping: 50 }}
            className="border border-zinc-200 -my-px bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 rounded-lg"
        >
            <div className="flex items-center justify-between px-4 py-1.5 bg-white rounded-t-lg border-b border-zinc-200 dark:bg-dark-header dark:border-zinc-800">
                {isEditing ? (
                    <input
                        className="text-xs text-zinc-600 dark:text-zinc-100 bg-transparent border-b border-zinc-300 focus:outline-none focus:border-black dark:focus:border-white"
                        value={title}
                        title="Renommer le groupe"
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === "Enter" && handleRename()}
                        autoFocus
                    />
                ) : (
                    <h2 className="text-xs text-zinc-600 dark:text-zinc-100">
                        {group.title || "Untitled"}
                    </h2>
                )}

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="g"
                        onClick={() => ""}
                        /* disabled={index === 0} */
                        title="Monter le groupe"
                    >
                        <ChevronUpIcon className="size-3" />
                    </Button>

                    <Button
                        variant="outline"
                        size="g"
                        onClick={() => ""}
                        /* disabled={index === lastIndex} */
                        title="Descendre le groupe"
                    >
                        <ChevronDownIcon className="size-3" />
                    </Button>

                    {!isDefault && (
                        <>
                            <span className="mx-1 h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                            <Button
                                variant="outline"
                                size="g"
                                onClick={() => setIsEditing(true)}
                                title="Renommer"
                            >
                                <PencilIcon className="size-3" />
                            </Button>
                            <Button
                                variant="outline_destructive"
                                size="g"
                                onClick={() => ""}
                                title="Supprimer"
                            >
                                <XMarkIcon className="size-3" />
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="min-h-10">{children}</div>
        </motion.li>
    );
}
