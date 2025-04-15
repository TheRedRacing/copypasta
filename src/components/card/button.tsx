import { cn } from '@/lib/utils';
import { CheckIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from "sonner"

import { sendGAEvent } from '@next/third-parties/google';
import { clipboardItem } from '@/lib/clipboardStorage';

interface PrivateButtonProps {
    isBlur: boolean;
    setIsBlur: (value: boolean) => void;
}
function PrivateButton({ isBlur, setIsBlur }: PrivateButtonProps) {
    return (
        <Button variant={'outline'} size={'i8'} onClick={() => setIsBlur(!isBlur)}>
            {isBlur ? (
                <EyeSlashIcon className="size-4" />
            ) : (
                <EyeIcon className="size-4" />
            )}
        </Button>
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
        <Button variant={'outline_destructive'} size={'i8'} className={cn(isDeleted ? "" : "")} onClick={() => deleteItem()}>
            {isDeleted ? (
                <CheckIcon className="size-4" />
            ) : (
                <TrashIcon className="size-4" />
            )}
        </Button>
    )
}



export { PrivateButton, TrashButton };