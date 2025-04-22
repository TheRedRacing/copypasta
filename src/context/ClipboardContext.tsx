"use client";

import { clipboardGroup, clipboardItem } from "@/type/clipboard";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getClipboardGroups, setClipboardGroups } from "@/lib/clipboardStorage";
import { migrateToV2, shouldMigrateToV2 } from "@/lib/migrations/V1ToV2";

type ClipboardContextType = {
    clipboardGroups: clipboardGroup[];
    setClipboardGroups: (groups: clipboardGroup[]) => void;
    loading: boolean;
    addGroup: (group: clipboardGroup) => void;
    moveGroupUp: (index: number) => void;
    moveGroupDown: (index: number) => void;
    renameGroup: (id: string, newTitle: string) => void;
    toogleGroup: (id: string) => void;
    deleteGroup: (id: string) => void;
    addItemToGroup: (groupId: string, item: clipboardItem) => void;
    updateItem: (originalGroupId: string, updatedGroupId: string, updatedItem: clipboardItem) => void;
    hideItem: (groupId: string, itemId: string) => void;
    deleteItem: (groupId: string, itemId: string) => void;
};

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [clipboardGroups, setClipboardGroupState] = useState<clipboardGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (shouldMigrateToV2()) migrateToV2();
        const stored = getClipboardGroups();
        setClipboardGroupState(stored);
        setTimeout(() => setLoading(false), 500);
    }, []);

    const persistGroups = (groups: clipboardGroup[]) => {
        setClipboardGroupState(groups);
        setClipboardGroups(groups);
    };

    const addGroup = (group: clipboardGroup) => {
        const newGroups = [...clipboardGroups, group];
        persistGroups(newGroups);
    };

    const moveGroupUp = (index: number) => {
        if (index === 0) return;
        const newGroups = [...clipboardGroups];
        [newGroups[index - 1], newGroups[index]] = [newGroups[index], newGroups[index - 1]];
        persistGroups(newGroups);
    };

    const moveGroupDown = (index: number) => {
        if (index === clipboardGroups.length - 1) return;
        const newGroups = [...clipboardGroups];
        [newGroups[index + 1], newGroups[index]] = [newGroups[index], newGroups[index + 1]];
        persistGroups(newGroups);
    };

    const renameGroup = (id: string, newTitle: string) => {
        const newGroups = clipboardGroups.map((group) => (group.id === id ? { ...group, title: newTitle } : group));
        persistGroups(newGroups);
    };

    const toogleGroup = (id: string) => {
        const newGroups = clipboardGroups.map((group) => (group.id === id ? { ...group, opened: !group.opened } : group));
        persistGroups(newGroups);
    };

    const deleteGroup = (id: string) => {
        const newGroups = clipboardGroups.filter((group) => group.id !== id);
        persistGroups(newGroups);
    };

    const addItemToGroup = (groupId: string, item: clipboardItem) => {
        const newGroups = clipboardGroups.map((group) => (group.id === groupId ? { ...group, items: [...group.items, item] } : group));
        persistGroups(newGroups);
    };

    const updateItem = (originalGroupId: string, updatedGroupId: string, updatedItem: clipboardItem) => {
        // Si même groupe → édition simple
        if (originalGroupId === updatedGroupId) {
            const updatedGroups = clipboardGroups.map((group) => {
                if (group.id !== originalGroupId) return group;

                const newItems = group.items.map((item) => (item.id === updatedItem.id ? updatedItem : item));

                return { ...group, items: newItems };
            });

            persistGroups(updatedGroups);
        } else {
            // Sinon, déplacer l’item dans un autre groupe
            let movedItem: clipboardItem | undefined;

            const newGroups = clipboardGroups
                .map((group) => {
                    if (group.id === originalGroupId) {
                        const remainingItems = group.items.filter((item) => {
                            if (item.id === updatedItem.id) {
                                movedItem = { ...item, ...updatedItem }; // merge les infos
                                return false;
                            }
                            return true;
                        });
                        return { ...group, items: remainingItems };
                    }
                    return group;
                })
                .map((group) => {
                    if (group.id === updatedGroupId && movedItem) {
                        return { ...group, items: [...group.items, movedItem] };
                    }
                    return group;
                });

            persistGroups(newGroups);
        }
    };

    const hideItem = (groupId: string, itemId: string) => {
        const updatedGroups = clipboardGroups.map((group) => {
            if (group.id !== groupId) return group;
            const updatedItems = group.items.map((item) => {
                if (item.id === itemId) {
                    return { ...item, isPrivate: !item.isPrivate };
                }
                return item;
            }
            );
            return { ...group, items: updatedItems };
        });
        persistGroups(updatedGroups);
    }

    const deleteItem = (groupId: string, itemId: string) => {
        const updatedGroups = clipboardGroups.map((group) => {
            if (group.id !== groupId) return group;

            const filteredItems = group.items.filter((item) => item.id !== itemId);
            return { ...group, items: filteredItems };
        });

        persistGroups(updatedGroups);
    };

    return (
        <ClipboardContext.Provider
            value={{
                clipboardGroups,
                setClipboardGroups: persistGroups,
                loading,
                addGroup,
                moveGroupUp,
                moveGroupDown,
                renameGroup,
                toogleGroup,
                deleteGroup,
                addItemToGroup,
                updateItem,
                hideItem,
                deleteItem,
            }}
        >
            {children}
        </ClipboardContext.Provider>
    );
};

export function useClipboard() {
    const context = useContext(ClipboardContext);
    if (!context) {
        throw new Error("useClipboard must be used within a ClipboardProvider");
    }
    return context;
}
