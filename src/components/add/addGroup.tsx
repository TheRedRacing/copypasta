"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { addGroup } from "@/lib/clipboardStorage";
import { useClipboard } from "@/context/ClipboardContext";

export default function AddGroup() {
    const { refreshGroups } = useClipboard();

    const handleAddGroup = () => {
        addGroup("Untitled"); 
        refreshGroups();
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
