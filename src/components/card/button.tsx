import { clipboardItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArchiveBoxIcon, CheckIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ButtonCard } from '../ui/button';
import { toast } from "sonner"

import { sendGAEvent } from '@next/third-parties/google';

interface PrivateButtonProps {
    isBlur: boolean;
    setIsBlur: (value: boolean) => void;
}
function PrivateButton({ isBlur, setIsBlur }: PrivateButtonProps) {
    return (
        <ButtonCard onClick={() => setIsBlur(!isBlur)}>
            {isBlur ? (
                <EyeSlashIcon className="size-5" />
            ) : (
                <EyeIcon className="size-5" />
            )}
        </ButtonCard>
    )
}

interface TrashButtonProps {
    item: clipboardItem;
}
function TrashButton({ item }: TrashButtonProps) {
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteItem = () => {
        const id = item.id;

        // Récupération des données sauvegardées
        const savedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardArchive") || "[]");
        const savedOrder: number[] = JSON.parse(localStorage.getItem("clipboardArchiveOrder") || "[]");

        // Suppression de l'élément dans le tableau
        const updatedTexts = savedData.filter((item) => item.id !== id);
        const updatedOrder = savedOrder.filter((order) => order !== id);

        // Mise à jour des données
        localStorage.setItem('clipboardArchiveOrder', JSON.stringify(updatedOrder));
        localStorage.setItem('clipboardArchive', JSON.stringify(updatedTexts));

        // Mise à jour de l'état
        setIsDeleted(true);

        // tracking
        sendGAEvent('event', 'delete', 'row');

        // Rechargement de la page
        toast("Deleted with success");
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <ButtonCard variant={"destructive"} className={cn(isDeleted ? "" : "")} onClick={() => deleteItem()}>
            {isDeleted ? (
                <CheckIcon className="size-5" />
            ) : (
                <TrashIcon className="size-5" />
            )}
        </ButtonCard>
    )
}

interface ArchiveButtonProps {
    item: clipboardItem;
}

function ArchiveButton({ item }: ArchiveButtonProps) {
    function archiveItem() {
        const id = item.id;

        // Retrieve saved data
        const savedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardTexts") || "[]");
        const savedOrder: number[] = JSON.parse(localStorage.getItem("clipboardOrder") || "[]");

        // Retrieve archive data
        const archivedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardArchive") || "[]");
        const archivedOrder: number[] = JSON.parse(localStorage.getItem("clipboardArchiveOrder") || "[]");

        // Find the item to archive
        const itemToArchive = savedData.find((i) => i.id === id);
        if (!itemToArchive) return;

        // Update clipboard by removing the item
        const updatedTexts = savedData.filter((i) => i.id !== id);
        const updatedOrder = savedOrder.filter((order) => order !== id);

        // Add item to archive
        const updatedArchive = [...archivedData, itemToArchive];
        const updatedArchiveOrder = [...archivedOrder, id];

        // Update localStorage
        localStorage.setItem("clipboardTexts", JSON.stringify(updatedTexts));
        localStorage.setItem("clipboardOrder", JSON.stringify(updatedOrder));
        localStorage.setItem("clipboardArchive", JSON.stringify(updatedArchive));
        localStorage.setItem("clipboardArchiveOrder", JSON.stringify(updatedArchiveOrder));

        // Tracking
        sendGAEvent("event", "archive", "row");

        // Reload page
        toast("Archived with success");
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <ButtonCard onClick={archiveItem}>
            <ArchiveBoxIcon className="size-5" />
        </ButtonCard>
    );
}

function UnArchiveButton({ item }: ArchiveButtonProps) {
    function unArchiveItem() {
        const id = item.id;

        // Retrieve clipboard data
        const savedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardTexts") || "[]");
        const savedOrder: number[] = JSON.parse(localStorage.getItem("clipboardOrder") || "[]");

        // Retrieve archive data
        const archivedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardArchive") || "[]");
        const archivedOrder: number[] = JSON.parse(localStorage.getItem("clipboardArchiveOrder") || "[]");

        // Find the item to unarchive
        const itemToUnarchive = archivedData.find((i) => i.id === id);
        if (!itemToUnarchive) return;

        // Remove from archive
        const updatedArchive = archivedData.filter((i) => i.id !== id);
        const updatedArchiveOrder = archivedOrder.filter((order) => order !== id);

        // Add back to clipboard
        const updatedTexts = [...savedData, itemToUnarchive];
        const updatedOrder = [...savedOrder, id];

        // Update localStorage
        localStorage.setItem("clipboardTexts", JSON.stringify(updatedTexts));
        localStorage.setItem("clipboardOrder", JSON.stringify(updatedOrder));
        localStorage.setItem("clipboardArchive", JSON.stringify(updatedArchive));
        localStorage.setItem("clipboardArchiveOrder", JSON.stringify(updatedArchiveOrder));

        // Tracking
        sendGAEvent("event", "unarchive", "row");

        // Reload page
        toast("Unarchived with success");
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <ButtonCard onClick={unArchiveItem}>
            <ArchiveBoxIcon className="size-5" />
        </ButtonCard>
    );
}




export { PrivateButton, TrashButton, ArchiveButton, UnArchiveButton };