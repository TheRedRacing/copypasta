'use client'

import { useState } from "react"

import ItemForm from "@/components/form/itemForm"
import { Button } from "@/components/ui/button"
import { clipboardGroup, clipboardItem } from "@/lib/clipboardStorage"
import { PencilIcon } from "@heroicons/react/24/outline"

interface EditButtonProps {
    item: clipboardItem
    groupId: string
    clipboardGroups: clipboardGroup[]
}

export default function EditButton({ item, groupId, clipboardGroups }: EditButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Button variant={'outline'} size={'i8'} onClick={() => setIsOpen(!isOpen)}>
                <PencilIcon className="size-4" />
            </Button>
            <ItemForm id={item.id} text={item.text} isPrivate={item.isPrivate} groupId={groupId} clipboardGroups={clipboardGroups} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}