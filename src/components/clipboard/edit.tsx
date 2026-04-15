"use client";

import { clipboardItem } from "@/type/clipboard";
import { useState } from "react";
import ItemForm from "@/components/form/itemForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditButtonProps {
    item: clipboardItem;
    groupId: string;
}

export default function EditButton({ item, groupId }: EditButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button variant={"outline"} size="i8" onClick={() => setIsOpen(!isOpen)}>
                <Pencil className="size-4" />
            </Button>
            <ItemForm id={item.id} text={item.text} isPrivate={item.isPrivate} groupId={groupId} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}
