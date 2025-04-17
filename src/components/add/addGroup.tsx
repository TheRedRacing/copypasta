"use client";

import { addClipboardGroup } from "@/lib/clipboardStorage";
import generateId from "@/lib/uuid";
import { clipboardGroup } from "@/type/clipboard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

interface AddGroupProps {
    set: React.Dispatch<React.SetStateAction<clipboardGroup[]>>;
}

export default function AddGroup({ set }: AddGroupProps) {
    const handleAddGroup = () => {
        const uuid = generateId();
        const newGroup: clipboardGroup = {
            id: uuid,
            title: "Untitled",
            items: [],
        };
        addClipboardGroup(newGroup);
        set((prev) => [...prev, newGroup]);
        toast.success("Group added with success");
    };

    return (
        <button
            type="button"
            onClick={handleAddGroup}
            className="flex items-center justify-center gap-2 border border-dashed border-zinc-300 w-full h-14 rounded-lg hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
        >
            <PlusIcon className="size-4" />
            Add group
        </button>
    );
}
