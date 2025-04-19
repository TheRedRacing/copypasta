'use client';

import ItemForm from "@/components/form/itemForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button size="sm" onClick={() => setIsOpen(true)}>
                Add clipboard
            </Button>
            <ItemForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
}
