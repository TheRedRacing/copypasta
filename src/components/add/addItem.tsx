"use client";

import { useState } from "react";
import ItemForm from "@/components/form/itemForm";
import { Button } from "@/components/ui/button";

export default function AddButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button size="sm" onClick={() => setIsOpen(true)}>
                Add clipboard
            </Button>
            <ItemForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}
