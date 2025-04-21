"use client";

import { useClipboard } from "@/context/ClipboardContext";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import AddGroup from "@/components/add/addGroup";
import { ClipboardCard, ClipboardGroupCard } from "@/components/clipboard";
import Cookies from "@/components/cookies";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
    const { clipboardGroups, setClipboardGroups, loading } = useClipboard();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDragEnd = (event: { active: any; over: any }) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        // Trouver le groupe contenant l'item déplacé
        const groupWithItem = clipboardGroups.find((group) => group.items.find((item) => item.id === active.id));

        if (!groupWithItem) return;

        const groupId = groupWithItem.id;
        const groupItems = groupWithItem.items;

        const oldIndex = groupItems.findIndex((item) => item.id === active.id);
        const newIndex = groupItems.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const reorderedItems = arrayMove(groupItems, oldIndex, newIndex);

        const newGroups = clipboardGroups.map((group) => (group.id === groupId ? { ...group, items: reorderedItems } : group));

        setClipboardGroups(newGroups);
    };

    // État de chargement
    if (loading) {
        return (
            <>
                <Header />
                <main className="flex-1 flex flex-col gap-4 px-4 py-4 mt-16 overflow-hidden">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="border border-zinc-200 bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 rounded-lg">
                            <div className="flex items-center justify-between px-4 py-1.5 h-10 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-header rounded-t-lg">
                                <div className="h-2.5 w-20 bg-zinc-200 animate-pulse rounded-full" />
                                <div className="h-6 w-6 border border-zinc-200 dark:border-zinc-800 animate-pulse rounded-lg" />
                            </div>
                            <div className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-b-lg">
                                <div className="h-12 border-y -my-px border-zinc-200 dark:border-zinc-800" />
                                <div className="h-12 border-y -my-px border-zinc-200 dark:border-zinc-800 last:rounded-b-lg" />
                            </div>
                        </div>
                        <div className="border border-zinc-200 bg-zinc-50 dark:bg-dark-main dark:border-zinc-800 rounded-lg">
                            <div className="flex items-center justify-between px-4 py-1.5 h-10 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-header rounded-t-lg">
                                <div className="h-2.5 w-20 bg-zinc-200 animate-pulse rounded-full" />
                                <div className="h-6 w-6 border border-zinc-200 dark:border-zinc-800 animate-pulse rounded-lg" />
                            </div>
                            <div className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-b-lg">
                                <div className="h-12 border-y -my-px border-zinc-200 dark:border-zinc-800" />
                                <div className="h-12 border-y -my-px border-zinc-200 dark:border-zinc-800 last:rounded-b-lg" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 border border-dashed border-zinc-300 w-full h-14 rounded-lg dark:border-zinc-700"></div>
                    </div>
                </main>
                <Cookies />
                <Footer />
            </>
        );
    }

    // Aucun groupe
    if (clipboardGroups.length === 0) {
        return (
            <>
                <Header />
                <main className="flex-1 flex flex-col gap-4 px-4 py-4 mt-16 overflow-hidden">
                    <AddGroup />
                </main>
                <Cookies />
                <Footer />
            </>
        );
    }

    // Affichage normal
    return (
        <>
            <Header />
            <motion.main layout className="flex-1 flex flex-col gap-4 px-4 py-4 mt-16 overflow-hidden">
                <div className="grid grid-cols-1 gap-4">
                    <DndContext modifiers={[restrictToVerticalAxis, restrictToWindowEdges]} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                        {clipboardGroups.map((clipboardGroup, clipboardGroupIDX) => (
                            <ClipboardGroupCard key={clipboardGroup.id} current={clipboardGroup} index={clipboardGroupIDX} lastIndex={clipboardGroups.length - 1}>
                                <SortableContext items={clipboardGroup.items}>
                                    <ul className="min-h-12 overflow-hidden">
                                        {clipboardGroup.items.map((item, index) => (
                                            <ClipboardCard key={item.id} item={item} groupId={clipboardGroup.id} index={index} />
                                        ))}
                                    </ul>
                                </SortableContext>
                            </ClipboardGroupCard>
                        ))}
                    </DndContext>
                    <AddGroup />
                </div>
            </motion.main>
            <Cookies />
            <Footer />
        </>
    );
}
