import { clipboardGroup, clipboardItem } from "@/type/clipboard";

const STORAGE_KEY = "clipboardGroups";

export function getClipboardGroups(): clipboardGroup[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function setClipboardGroups(groups: clipboardGroup[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

export function addClipboardGroup(group: clipboardGroup): void {
    const groups = getClipboardGroups();
    groups.push(group);
    setClipboardGroups(groups);
}

export function removeClipboardGroup(id: string): void {
    const groups = getClipboardGroups();
    const newGroups = groups.filter((group) => group.id !== id);
    setClipboardGroups(newGroups);
}