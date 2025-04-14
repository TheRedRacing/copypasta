import { addGroup } from "@/lib/clipboardStorage";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export default function AddGroup() {
    const handleAddGroup = () => {
        addGroup("Undefined");
        toast.success("Group added");
        window.location.reload();
    };

    return (
        <button
            onClick={handleAddGroup}
            className="flex items-center justify-center gap-2 border border-dashed border-zinc-300 w-full h-14 rounded-lg hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
        >
            <PlusIcon className="size-4" />
            Add group
        </button>
    );
}