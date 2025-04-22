"use client";

import { useClipboard } from "@/context/ClipboardContext";
import { clipboardGroup } from "@/type/clipboard";
import { useState } from "react";
import { Bars3Icon, ChevronDownIcon, ChevronUpIcon, ClipboardIcon, EyeIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ClipboardGroupCardProps {
    current: clipboardGroup;
    children?: React.ReactNode;
    index: number;
    lastIndex: number;
}

export default function ClipboardGroupCard({ current, children, index, lastIndex }: ClipboardGroupCardProps) {
    const { renameGroup, toogleGroup } = useClipboard();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(current.title);

    const handleRename = () => {
        const trimmed = title.trim();
        if (trimmed && trimmed !== current.title) {
            renameGroup(current.id, trimmed);
            toast.success("Groupe renamed with success");
        }
        setIsEditing(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(current.items.map((item) => item.text).join("\n"));
        toast.success("Group copied to clipboard");
    };

    const toggleHide = () => {
        toogleGroup(current.id);
    };

    return (
        <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 40 }} className="border border-zinc-200 bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 rounded-lg overflow-hidden">
            <div className={cn("flex items-center justify-between px-4 py-1.5 h-10 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-header rounded-t-lg", current.opened && "rounded-b-lg border-b-0")}>
                {isEditing ? <input className="text-xs text-zinc-600 dark:text-zinc-100 bg-transparent border-b border-zinc-300 focus:outline-none focus:border-black dark:focus:border-white" value={title} title="Renommer le groupe" onChange={(e) => setTitle(e.target.value)} onBlur={handleRename} onKeyDown={(e) => e.key === "Enter" && handleRename()} autoFocus /> : <h2 className="text-xs text-zinc-600 dark:text-zinc-100 leading-5">{current.title}</h2>}
                <InlineMenu current={current} index={index} lastIndex={lastIndex} handleCopy={handleCopy} toggleHide={toggleHide} onEdit={() => setIsEditing(!isEditing)} />
            </div>

            <AnimatePresence initial={false}>
                {!current.opened && (
                    <motion.div key="items" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface GroupInlineMenuProps {
    current: clipboardGroup;
    index: number;
    lastIndex: number;
    handleCopy: () => void;
    toggleHide: () => void;
    onEdit: () => void;
}

function InlineMenu({ current, index, lastIndex, handleCopy, toggleHide, onEdit }: GroupInlineMenuProps) {
    const { moveGroupUp, moveGroupDown } = useClipboard();
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex items-center gap-1">
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="menu" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="flex items-center gap-1">
                        <Button variant="outline" size="g" onClick={handleCopy}>
                            <ClipboardIcon className="size-3" />
                        </Button>
                        <Button variant="outline" size="g" onClick={toggleHide}>
                            <EyeIcon className="size-3" />
                        </Button>
                        <Button variant="outline" size="g" onClick={() => moveGroupUp(index)} disabled={index === 0}>
                            <ChevronUpIcon className="size-3" />
                        </Button>
                        <Button variant="outline" size="g" onClick={() => moveGroupDown(index)} disabled={index === lastIndex}>
                            <ChevronDownIcon className="size-3" />
                        </Button>
                        <Button variant="outline" size="g" onClick={onEdit}>
                            <PencilIcon className="size-3" />
                        </Button>
                        <DeleteGroupButton current={current} />
                        <span className="mx-1 h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                    </motion.div>
                )}
                <motion.div key="trigger" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                    <Button variant="outline" size="g" onClick={() => setOpen(!open)}>
                        {open ? <XMarkIcon className="size-3" /> : <Bars3Icon className="size-3" />}
                    </Button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

interface DeleteGroupButtonProps {
    current: clipboardGroup;
}

function DeleteGroupButton({ current }: DeleteGroupButtonProps) {
    const { deleteGroup } = useClipboard();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        deleteGroup(current.id);
        setIsOpen(false);
        toast.success("Group deleted with success");
    };

    return (
        <>
            <Button variant="outline_destructive" size="g" onClick={() => setIsOpen(true)}>
                <TrashIcon className="size-3" />
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center">
                        <TrashIcon className="size-10 text-red-500" />
                        <p className="mt-4 text-md font-semibold text-center">Are you sure you want to delete this group ?</p>
                        <p className="mt-2 text-sm text-center text-muted-foreground">{`"${current.title}"`}</p>
                        <div className="mt-2 w-full bg-red-50 border-l-4 border-red-400 text-red-700 text-sm p-4">
                            <ul className="list-disc list-inside">
                                <li>This action cannot be undone !</li>
                                <li>All items in this group will be permanently deleted !</li>
                                <li>Make sure to backup any important data before proceeding !</li>
                            </ul>
                        </div>
                        <p className="mt-4 text-sm text-center text-muted-foreground">You will lost {" " + current.items.length} items if you proceed.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <DialogClose asChild>
                            <Button variant="secondary">No, Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" type="submit" onClick={handleDelete}>
                            {"Yes, I'm sure"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
