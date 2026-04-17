export type ClipboardItem = {
    id: string;
    text: string;
    isPrivate: boolean;
};

export type ClipboardItemOrNull = {
    id: string;
    text: string;
    isPrivate: boolean;
} | null;

export type ClipboardGroup = {
    id: string;
    title: string;
    opened?: boolean;
    items: ClipboardItem[];
};

export interface SharePayload {
    version: 1;
    item: ClipboardItem;
}