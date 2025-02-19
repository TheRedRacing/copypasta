import { cn } from '@/lib/utils';
import { CheckIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const classNormal = "group/item flex items-center justify-center rounded-md px-4 py-2 bg-transparent hover:bg-cyan-50 text-xs font-medium text-zinc-600 hover:text-cyan-700 ring-1 ring-inset ring-zinc-500/10 hover:ring-cyan-600/10";
const classDelete = "group/item flex items-center justify-center rounded-md px-4 py-2 bg-transparent hover:bg-red-50 text-xs font-medium text-zinc-600 hover:text-red-700 ring-1 ring-inset ring-zinc-500/10 hover:ring-red-600/10"
const classDeleted= "group/item flex items-center justify-center rounded-md px-4 py-2 bg-red-50 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"

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
    id: number;
}
function TrashButton({ id }: TrashButtonProps) {
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteItem = () => {
        const clipboardText = localStorage.getItem('clipboardTexts') || '[]';
        const clipboard: ClipboardItem[] = JSON.parse(clipboardText);
        const updatedTexts = clipboard.filter((_, i) => i !== id);
        localStorage.setItem('clipboardTexts', JSON.stringify(updatedTexts));
        setIsDeleted(true);
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