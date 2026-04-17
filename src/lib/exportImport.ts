import { ClipboardGroup, ClipboardItem } from "@/type/clipboard";

export type ExportPayloadV1 = {
    version: 1;
    exportedAt: string; // ISO
    groups: ClipboardGroup[];
};

export type ImportMode = "replace" | "merge";

export function buildExportPayload(groups: ClipboardGroup[]): ExportPayloadV1 {
    return {
        version: 1,
        exportedAt: new Date().toISOString(),
        groups,
    };
}

export function downloadJson(filename: string, data: unknown): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

export function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Could not read file"));
        reader.onload = () => resolve(String(reader.result ?? ""));
        reader.readAsText(file);
    });
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isClipboardItem(value: unknown): value is ClipboardItem {
    if (!isRecord(value)) return false;

    const id = value.id;
    const text = value.text;
    const isPrivate = value.isPrivate;

    return typeof id === "string" && typeof text === "string" && typeof isPrivate === "boolean";
}

function isClipboardGroup(value: unknown): value is ClipboardGroup {
    if (!isRecord(value)) return false;

    const id = value.id;
    const title = value.title;
    const opened = value.opened;
    const items = value.items;

    if (typeof id !== "string") return false;
    if (typeof title !== "string") return false;

    // opened? boolean | undefined
    if (!(typeof opened === "boolean" || typeof opened === "undefined")) return false;

    if (!Array.isArray(items)) return false;
    return items.every(isClipboardItem);
}

export function parseImportPayload(jsonText: string): ExportPayloadV1 {
    const parsed: unknown = JSON.parse(jsonText);
    if (!isRecord(parsed)) throw new Error("Invalid JSON payload");

    const version = parsed.version;
    const exportedAt = parsed.exportedAt;
    const groups = parsed.groups;

    if (version !== 1) throw new Error("Unsupported export version");
    if (typeof exportedAt !== "string") throw new Error("Invalid exportedAt");
    if (!Array.isArray(groups) || !groups.every(isClipboardGroup)) {
        throw new Error("Invalid groups format");
    }

    return { version: 1, exportedAt, groups };
}

/**
 * Merge rules:
 * - groups merged by group id
 * - items merged by item id
 * - incoming group props override existing (title/opened)
 * - incoming items override existing items on same id
 */
export function mergeGroups(existing: ClipboardGroup[], incoming: ClipboardGroup[]): ClipboardGroup[] {
    const byGroupId = new Map<string, ClipboardGroup>();

    for (const g of existing) byGroupId.set(g.id, g);

    for (const inc of incoming) {
        const cur = byGroupId.get(inc.id);

        if (!cur) {
            byGroupId.set(inc.id, inc);
            continue;
        }

        const itemsById = new Map<string, ClipboardItem>();
        for (const it of cur.items) itemsById.set(it.id, it);
        for (const it of inc.items) itemsById.set(it.id, it);

        byGroupId.set(inc.id, {
            ...cur,
            ...inc,
            items: Array.from(itemsById.values()),
        });
    }

    return Array.from(byGroupId.values());
}
