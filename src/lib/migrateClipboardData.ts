import { clipboardGroup, clipboardItem, ensureUnsortedGroupExists, getDefaultGroup, saveClipboardGroups } from "@/lib/clipboardStorage";
import generateUUID from "@/lib/uuid";


type OldClipboardItem = {
    id: number;
    text: string;
    isPrivate: boolean;
};

export const needsMigration = (): boolean => {
    return !!localStorage.getItem("clipboardTexts") && !!localStorage.getItem("clipboardOrder") && !!localStorage.getItem("clipboardArchive");
};

export const migrateClipboardData = () => {
    const texts = JSON.parse(localStorage.getItem("clipboardTexts") || "[]") as OldClipboardItem[];
    const order = JSON.parse(localStorage.getItem("clipboardOrder") || "[]") as number[];
    const archive = JSON.parse(localStorage.getItem("clipboardArchive") || "[]") as OldClipboardItem[];

    const reordered = order.map((id) => texts.find((t) => t.id === id)).filter(Boolean) as OldClipboardItem[];

    const convertedItems: clipboardItem[] = reordered.map((item) => ({
        id: generateUUID(),
        text: item.text,
        isPrivate: item.isPrivate,
    }));

    const convertedArchive: clipboardItem[] = archive.map((item) => ({
        id: generateUUID(),
        text: item.text,
        isPrivate: item.isPrivate,
    }));

    const mainGroup = getDefaultGroup();
    mainGroup.items = convertedItems;

    const archiveGroup: clipboardGroup = {
        id: generateUUID(),
        title: "Archived",
        items: convertedArchive,
    };

    // Sauvegarde les groupes
    saveClipboardGroups([mainGroup, archiveGroup]);

    // Ajoute le groupe "Unsorted" s’il n’existe pas
    ensureUnsortedGroupExists();

    // Nettoie les anciennes données
    localStorage.removeItem("clipboardTexts");
    localStorage.removeItem("clipboardOrder");
    localStorage.removeItem("clipboardArchive");
    localStorage.removeItem("clipboardArchiveOrder");
};