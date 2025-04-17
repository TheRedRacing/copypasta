'use client'

import { useState } from "react";

import { clipboardGroup } from "@/type/clipboard";

import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button";
import { Bars3Icon, ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ClipboardGroupCardProps {
    current: clipboardGroup;
    moveGroupUp: (index: number) => void;
    moveGroupDown: (index: number) => void;
    children?: React.ReactNode;
    index: number;
    lastIndex: number;
}

export default function ClipboardGroupCard({ current, children, moveGroupUp, moveGroupDown, index, lastIndex }: ClipboardGroupCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(current.title);

    const isDefault = current.title === "Default";

    const handleRename = () => {
        const trimmed = title.trim();
        if (trimmed && trimmed !== current.title) {

        }
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
            className="border border-zinc-200 bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 rounded-lg"
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
                        {current.title + " - " + current.id || "Untitled"}
                    </h2>
                )}

                <InlineMenu
                    index={index}
                    lastIndex={lastIndex}
                    isDefault={isDefault}
                    moveUp={() => moveGroupUp(index)}
                    moveDown={() => moveGroupDown(index)}
                />
            </div>

            <div className="min-h-10">{children}</div>
        </motion.div>
    )
}

interface GroupInlineMenuProps {
    index: number
    lastIndex: number
    isDefault: boolean
    onEdit?: () => void
    onDelete?: () => void
    moveUp: () => void
    moveDown: () => void
}

function InlineMenu({ index, lastIndex, isDefault, onEdit, onDelete, moveUp, moveDown }: GroupInlineMenuProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative flex items-center gap-1">
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1"
                    >
                        <Button variant="outline" size="g" onClick={moveUp} disabled={index === 0}>
                            <ChevronUpIcon className="size-3" />
                        </Button>
                        <Button variant="outline" size="g" onClick={moveDown} disabled={index === lastIndex}>
                            <ChevronDownIcon className="size-3" />
                        </Button>

                        {!isDefault && (
                            <>
                                <Button variant="outline" size="g" onClick={onEdit}>
                                    <PencilIcon className="size-3" />
                                </Button>
                                <Button variant="outline_destructive" size="g" onClick={onDelete}>
                                    <TrashIcon className="size-3" />
                                </Button>
                            </>
                        )}
                        <span className="mx-1 h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                    </motion.div>
                )}
                <motion.div
                    key="trigger"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button variant="outline" size="g" onClick={() => setOpen(!open)}>
                        {open ? <XMarkIcon className="size-3" /> : <Bars3Icon className="size-3" />}
                    </Button>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}