import { setClipboardGroups } from "@/lib/clipboardStorage";
import { clipboardGroup, clipboardItem } from "@/lib/exportImport";
import generateId from "@/lib/uuid";

type clipboardItemOld = {
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
        const texts: clipboardItemOld[] = JSON.parse(localStorage.getItem("clipboardTexts") || "[]");
        const order: number[] = JSON.parse(localStorage.getItem("clipboardOrder") || "[]");
        const archive: clipboardItemOld[] = JSON.parse(localStorage.getItem("clipboardArchive") || "[]");

        const orderedItems = order.map((id) => texts.find((item) => item.id === id)).filter((item): item is clipboardItemOld => !!item);

        const defaultGroup: clipboardGroup = {
            id: generateId(),
            title: "V2",
            opened: true,
            items: orderedItems.map<clipboardItem>((item) => ({
                id: generateId(),
                text: item.text,
                isPrivate: item.isPrivate,
            })),
        };

        const archivedGroup: clipboardGroup = {
            id: generateId(),
            title: "Archived Items",
            opened: true,
            items: archive.map<clipboardItem>((item) => ({
                id: generateId(),
                text: item.text,
                isPrivate: item.isPrivate,
            })),
        };

        const newGroups: clipboardGroup[] = [defaultGroup, archivedGroup];
        setClipboardGroups(newGroups);

        localStorage.removeItem("clipboardTexts");
        localStorage.removeItem("clipboardOrder");
        localStorage.removeItem("clipboardArchive");
        localStorage.removeItem("clipboardArchiveOrder");

        console.log("✅ Migration vers V2 terminée avec succès !");
    } catch (error) {
        console.error("❌ Erreur durant la migration vers V2 :", error);
    }
}
