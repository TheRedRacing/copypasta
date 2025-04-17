export type clipboardItem = {
    id: string;
    text: string;
    isPrivate: boolean;
};

export type clipboardGroup = {
    id: string;
    title: string;
    items: clipboardItem[];
};