import { ClipboardGroup, ClipboardItem } from "@/type/clipboard";
import { setClipboardGroups } from "@/lib/clipboardStorage";
import generateId from "@/lib/uuid";

type ClipboardItemOld = {
    id: number;
    text: string;
    isPrivate: boolean;
};

export function shouldMigrateToV2(): boolean {
    const hasNewStructure = localStorage.getItem("clipboardGroups") !== null;
    const hasOldStructure = localStorage.getItem("clipboardTexts") !== null || localStorage.getItem("clipboardOrder") !== null || localStorage.getItem("clipboardArchive") !== null;

    return !hasNewStructure && hasOldStructure;
}

export function migrateToV2(): void {
    try {
        const texts: ClipboardItemOld[] = JSON.parse(localStorage.getItem("clipboardTexts") || "[]");
        const order: number[] = JSON.parse(localStorage.getItem("clipboardOrder") || "[]");
        const archive: ClipboardItemOld[] = JSON.parse(localStorage.getItem("clipboardArchive") || "[]");

        const orderedItems = order.map((id) => texts.find((item) => item.id === id)).filter((item): item is ClipboardItemOld => !!item);

        const defaultGroup: ClipboardGroup = {
            id: generateId(),
            title: "V2",
            opened: true,
            items: orderedItems.map<ClipboardItem>((item) => ({
                id: generateId(),
                text: item.text,
                isPrivate: item.isPrivate,
            })),
        };

        const archivedGroup: ClipboardGroup = {
            id: generateId(),
            title: "Archived Items",
            opened: true,
            items: archive.map<ClipboardItem>((item) => ({
                id: generateId(),
                text: item.text,
                isPrivate: item.isPrivate,
            })),
        };

        const newGroups: ClipboardGroup[] = [defaultGroup, archivedGroup];
        setClipboardGroups(newGroups);

        localStorage.removeItem("clipboardTexts");
        localStorage.removeItem("clipboardOrder");
        localStorage.removeItem("clipboardArchive");
        localStorage.removeItem("clipboardArchiveOrder");

        console.log("✅ Migration to V2 completed successfully !");
    } catch (error) {
        console.error("❌ Error during migration to V2 :", error);
    }
}
