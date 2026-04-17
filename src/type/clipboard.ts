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

export interface ShareRecord {
    token: string; // nanoid(12)
    label?: string; // nom optionnel pour s'y retrouver
    createdAt: number; // Date.now()
    expiresAt?: number; // Date.now() + ms, undefined = pas d'expiration
    itemIds: string[]; // IDs des ClipboardItems inclus
    groupIds: string[]; // IDs des groupes entiers inclus
}

export interface SharePayload {
    version: 1;
    items: ClipboardItem[];
    groups: ClipboardGroup[];
    createdAt: number;
    expiresAt?: number;
}