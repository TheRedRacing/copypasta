import { cn } from '@/lib/utils';
import { ClipboardIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const classNormal = "group/item flex-1 flex items-center justify-center rounded-md bg-zinc-50 hover:bg-zinc-100/90 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10";
const classCopied = "group/item flex-1 flex items-center justify-center rounded-md bg-green-50 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10";
const classDelete = "group/item flex-1 flex items-center justify-center rounded-md bg-zinc-50 hover:bg-red-50 text-xs font-medium text-zinc-600 hover:text-red-700 ring-1 ring-inset ring-zinc-500/10 hover:ring-red-600/10"

interface CopyButtonProps {
    text: string;
}
function CopyButton({ text }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Erreur de copie :", err);
        }
    }

    return (
        <button className={cn(isCopied ? classCopied : classNormal)} onClick={copyToClipboard}>
            {isCopied ? (
                <span>Copied</span>
            ) : (
                <ClipboardIcon className="size-6" />
            )}
        </button>
    )
}

interface PrivateButtonProps {
    isBlur: boolean;
    setIsBlur: (value: boolean) => void;
}
function PrivateButton({ isBlur, setIsBlur }: PrivateButtonProps) {
    return (
        <button className={cn(classNormal)} onClick={() => setIsBlur(!isBlur)}>
            {isBlur ? (
                <EyeSlashIcon className="size-6" />
            ) : (
                <EyeIcon className="size-6" />
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
        <button className={cn(classDelete)} onClick={() => deleteItem()}>
            {isDeleted ? (
                <span>Deleted</span>
            ) : (
                <TrashIcon className="size-6" />
            )}
        </button>
    )
}

export { CopyButton, PrivateButton, TrashButton };