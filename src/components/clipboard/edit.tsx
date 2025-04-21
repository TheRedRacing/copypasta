'use client'

import { useState } from "react"

import ItemForm from "@/components/form/itemForm"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "@heroicons/react/24/outline"
import { clipboardItem } from "@/type/clipboard"

interface EditButtonProps {
    item: clipboardItem
    groupId: string
}

export default function EditButton({ item, groupId }: EditButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Button variant={'outline'} size="g" onClick={() => setIsOpen(!isOpen)}>
                <PencilIcon className="size-3" />
            </Button>
            <ItemForm id={item.id} text={item.text} isPrivate={item.isPrivate} groupId={groupId} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}