'use client'

import { useState } from "react";

import { clipboardGroup } from "@/type/clipboard";

import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button";
import { Bars3Icon, ChevronDownIcon, ChevronUpIcon, EyeIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useClipboard } from "@/context/ClipboardContext";

interface ClipboardGroupCardProps {
    current: clipboardGroup;
    children?: React.ReactNode;
    index: number;
    lastIndex: number;
}

export default function ClipboardGroupCard({ current, children, index, lastIndex }: ClipboardGroupCardProps) {
    const { renameGroup } = useClipboard();
    const [isEditing, setIsEditing] = useState(false);
    const [hideItems, setHideItems] = useState(false);
    const [title, setTitle] = useState(current.title);

    const isDefault = current.title === "Default";

    const handleRename = () => {
        const trimmed = title.trim();
        if (trimmed && trimmed !== current.title) {
            renameGroup(current.id, trimmed);
            toast.success("Groupe renommé avec succès");
        }
        setIsEditing(false);
    };

    const toggleHide = () => {
        setHideItems((prev) => !prev);
    };

    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
            className="border border-zinc-200 bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 rounded-lg"
        >
            <div className={cn("flex items-center justify-between px-4 py-1.5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-header rounded-t-lg", hideItems && "rounded-b-lg border-b-0")}>
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
                    id={current.id}
                    index={index}
                    lastIndex={lastIndex}
                    isDefault={isDefault}
                    toggleHide={toggleHide}
                    onEdit={() => setIsEditing(!isEditing)}
                />
            </div>

            <AnimatePresence initial={false}>
                {!hideItems && (
                    <motion.div
                        key="items"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

interface GroupInlineMenuProps {
    id: string
    index: number
    lastIndex: number
    isDefault: boolean
    toggleHide: () => void
    onEdit: () => void
}

function InlineMenu({ id, index, lastIndex, isDefault, toggleHide, onEdit }: GroupInlineMenuProps) {
    const { moveGroupUp, moveGroupDown, deleteGroup } = useClipboard();
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
                        <Button variant="outline" size="g" onClick={toggleHide}>
                            <EyeIcon className="size-3" />
                        </Button>
                        <Button variant="outline" size="g" onClick={() => moveGroupUp(index)} disabled={index === 0}>
                            <ChevronUpIcon className="size-3" />
                        </Button>
                        <Button variant="outline" size="g" onClick={() => moveGroupDown(index)} disabled={index === lastIndex}>
                            <ChevronDownIcon className="size-3" />
                        </Button>

                        {!isDefault && (
                            <>
                                <Button variant="outline" size="g" onClick={onEdit}>
                                    <PencilIcon className="size-3" />
                                </Button>
                                <Button variant="outline_destructive" size="g" onClick={() => deleteGroup(id)}>
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