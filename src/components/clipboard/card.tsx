import { cn } from "@/lib/utils";
import { useState } from "react";

import { useSortable } from '@dnd-kit/sortable';
import { focusClassName } from "@/lib/focus";
import { CSS } from "@dnd-kit/utilities";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import EditButton from "@/components/clipboard/edit";
import { clipboardItem } from "@/type/clipboard";
import { EyeIcon, EyeSlashIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useClipboard } from "@/context/ClipboardContext";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ClipboardCardProps {
    item: clipboardItem
    index: number
    groupId: string
}

export default function ClipboardCard({ item, index, groupId }: ClipboardCardProps) {
    const [showPrivate, setShowPrivate] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(item.text);
            sendGAEvent('event', 'copy', 'row');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            toast.success("Copied to clipboard");
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
        <li key={index} ref={setNodeRef} className={cn("relative flex-1 flex items-stretch justify-between pr-4 bg-white border-y border-zinc-200 -my-px hover:bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 dark:hover:bg-dark-hover")} style={style} {...attributes}>
            <Button variant={'outline'} size={'i8'} {...listeners} ref={setActivatorNodeRef} className="flex items-center justify-center w-8 h-8 p-1 m-2 hover:bg-zinc-100 dark:hover:bg-dark-hover rounded-lg cursor-grab active:cursor-grabbing">
                <span className="text-lg">⠿</span>
            </Button>
            <div className="flex-1 truncate flex items-center justify-start pl-4 sm:pl-0 py-2" onClick={copyToClipboard}>
                <span className={cn(item.isPrivate && !showPrivate && "blur-sm", "text-left text-sm")}>{item.text}</span>
            </div>
            <div className="flex shrink-0 items-center gap-1 pl-2 py-2">
                {item.isPrivate && (
                    <Button variant="outline" size="g" onClick={() => setShowPrivate(prev => !prev)}>
                        {showPrivate ? <EyeSlashIcon className="size-3" /> : <EyeIcon className="size-3" />}
                    </Button>
                )}
                <EditButton item={item} groupId={groupId} />
                <DeleteGroupButton item={item} groupId={groupId} />
            </div>

            <div className={cn(isCopied ? "opacity-100 h-full" : "opacity-0 h-0", "absolute inset-x-0 top-1/2 -translate-y-1/2 select-none flex items-center justify-center text-sm bg-green-50 text-green-700 dark:bg-[#142118] dark:text-green-400 transition-all duration-500 ease-in-out")}>
                Copied
            </div>
        </li>
    );
}

interface DeleteButtonProps {
    item: clipboardItem;
    groupId: string;
}

function DeleteGroupButton({ item, groupId }: DeleteButtonProps) {
    const { deleteItem } = useClipboard();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        deleteItem(groupId, item.id);
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
                        <p className="mt-4 text-md font-semibold text-center">Are you sure you want to delete this item ?</p>
                        <p className="mt-2 text-sm text-center text-muted-foreground">{`"${item.text}"`}</p>
                        <div className="mt-2 w-full bg-red-50 border-l-4 border-red-400 text-red-700 text-sm p-4">
                            <ul className="list-disc list-inside">
                                <li>
                                    This action cannot be undone !
                                </li>
                                <li>
                                    Make sure to backup any important data before proceeding !
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <DialogClose asChild>
                            <Button variant="secondary">No, Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" type="submit" onClick={handleDelete}>
                            {"Yes, I'm sure"}
                        </Button>
                    </div>
                </DialogContent >
            </Dialog >
        </>
    )
}