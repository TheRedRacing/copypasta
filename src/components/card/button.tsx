import { clipboardItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const classNormal = "flex items-center justify-center rounded-md px-4 py-2 bg-transparent hover:bg-primary-50 text-xs font-medium text-zinc-600 hover:text-primary-700 ring-1 ring-inset ring-zinc-500/10 hover:ring-primary-600/10";
const classDelete = "flex items-center justify-center rounded-md px-4 py-2 bg-transparent hover:bg-red-50 text-xs font-medium text-zinc-600 hover:text-red-700 ring-1 ring-inset ring-zinc-500/10 hover:ring-red-600/10"
const classDeleted = "flex items-center justify-center rounded-md px-4 py-2 bg-red-50 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"

interface PrivateButtonProps {
    isBlur: boolean;
    setIsBlur: (value: boolean) => void;
}
function PrivateButton({ isBlur, setIsBlur }: PrivateButtonProps) {
    return (
        <button className={cn(classNormal)} onClick={() => setIsBlur(!isBlur)}>
            {isBlur ? (
                <EyeSlashIcon className="size-5" />
            ) : (
                <EyeIcon className="size-5" />
            )}
        </button>
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

        // Rechargement de la page
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <button className={cn(isDeleted ? classDeleted : classDelete)} onClick={() => deleteItem()}>
            {isDeleted ? (
                <CheckIcon className="size-5" />
            ) : (
                <TrashIcon className="size-5" />
            )}
        </button>
    )
}

export { PrivateButton, TrashButton };