import { clipboardItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ButtonCard } from '../ui/button';
import { track } from '@vercel/analytics';

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
        const savedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardTexts") || "[]");
        const savedOrder: number[] = JSON.parse(localStorage.getItem("clipboardOrder") || "[]");

        // Suppression de l'élément dans le tableau
        const updatedTexts = savedData.filter((item) => item.id !== id);
        const updatedOrder = savedOrder.filter((order) => order !== id);

        // Mise à jour des données
        localStorage.setItem('clipboardOrder', JSON.stringify(updatedOrder));
        localStorage.setItem('clipboardTexts', JSON.stringify(updatedTexts));

        // Mise à jour de l'état
        setIsDeleted(true);

        // tracking
        track("row deleted");

        // Rechargement de la page
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

export { PrivateButton, TrashButton };