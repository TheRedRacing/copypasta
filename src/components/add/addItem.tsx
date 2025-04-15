'use client';

import ItemForm from "@/components/form/itemForm";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/context/ClipboardContext";
import { useState } from "react";

export default function AddButton() {
    const { clipboardGroups } = useClipboard(); // 🔥 on récupère depuis le context
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button size="sm" onClick={() => setIsOpen(true)}>
                Add clipboard
            </Button>
            <ItemForm
                clipboardGroups={clipboardGroups}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
}
