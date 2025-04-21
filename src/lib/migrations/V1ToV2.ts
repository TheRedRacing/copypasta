import { clipboardGroup, clipboardItem } from "@/type/clipboard";
import { setClipboardGroups } from "@/lib/clipboardStorage";
import generateId from "@/lib/uuid";

// Ancienne structure de données (V1.0 à V1.4)
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

        // Vérification de doublons / correspondance
        const orderedItems = order.map((id) => texts.find((item) => item.id === id)).filter((item): item is clipboardItemOld => !!item);

        const defaultGroup: clipboardGroup = {
            id: generateId(),
            title: "V1.5",
            items: orderedItems.map<clipboardItem>((item) => ({
                id: generateId(),
                text: item.text,
                isPrivate: item.isPrivate,
            })),
        };

        const archivedGroup: clipboardGroup = {
            id: generateId(),
            title: "Archived Items",
            items: archive.map<clipboardItem>((item) => ({
                id: generateId(),
                text: item.text,
                isPrivate: item.isPrivate,
            })),
        };

        const newGroups: clipboardGroup[] = [defaultGroup, archivedGroup];
        setClipboardGroups(newGroups);

        // Nettoyage des anciennes clés
        localStorage.removeItem("clipboardTexts");
        localStorage.removeItem("clipboardOrder");
        localStorage.removeItem("clipboardArchive");
        localStorage.removeItem("clipboardArchiveOrder");

        console.log("✅ Migration vers V1.5 terminée avec succès !");
    } catch (error) {
        console.error("❌ Erreur durant la migration vers V1.5 :", error);
    }
}
