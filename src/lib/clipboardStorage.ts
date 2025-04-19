import { clipboardGroup, clipboardItem } from "@/type/clipboard";


const STORAGE_KEY = "clipboardGroups";
const VERSION_KEY = "clipboardGroupsVersion";
const VERSION = "V2.0.0";

function getClipboardGroups(): clipboardGroup[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function setClipboardGroups(groups: clipboardGroup[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    localStorage.setItem(VERSION_KEY, JSON.stringify(VERSION));
}

function addClipboardGroup(group: clipboardGroup): void {
    const groups = getClipboardGroups();
    groups.push(group);
    setClipboardGroups(groups);
}

function removeClipboardGroup(id: string): void {
    const groups = getClipboardGroups();
    const newGroups = groups.filter((group) => group.id !== id);
    setClipboardGroups(newGroups);
}

function addClipboardGroupItem(groupId: string, item: clipboardItem): void {
    const groups = getClipboardGroups();
    const groupIndex = groups.findIndex((group) => group.id === groupId);
    if (groupIndex !== -1) {
        const group = groups[groupIndex];
        group.items.push(item);
        groups[groupIndex] = group;
        setClipboardGroups(groups);
    }
}

export {
    getClipboardGroups,
    setClipboardGroups,
    addClipboardGroup,
    removeClipboardGroup,
    addClipboardGroupItem,
}