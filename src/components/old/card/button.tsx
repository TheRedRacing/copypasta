import { cn } from '@/lib/utils';
import { CheckIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { toast } from "sonner"
import { clipboardItem } from '@/type/clipboard';

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