"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Dialog, DialogClose, DialogContent, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog"

import {
    Form, FormControl, FormDescription, FormField,
    FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"

import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
    addClipboardToGroup,
    updateClipboardItem,
    clipboardGroup,
} from "@/lib/clipboardStorage"
import { toast } from "sonner"

interface ItemFormProps {
    id?: string
    text?: string
    isPrivate?: boolean
    groupId?: string
    clipboardGroups?: clipboardGroup[]
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

const formSchema = z.object({
    id: z.string().optional(),
    text: z.string().min(2, "You must enter at least 2 characters"),
    isPrivate: z.boolean().default(false),
    groupId: z.string().optional(),
})

export default function ItemForm({ id, text, isPrivate, groupId, clipboardGroups, isOpen, setIsOpen }: ItemFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id,
            text: text ?? "",
            isPrivate: isPrivate ?? false,
            groupId: groupId ?? "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const clipboardItem = {
            id: values.id ?? Date.now().toString(),
            text: values.text,
            isPrivate: values.isPrivate,
        }

        if (values.id) {
            // ✏️ Édition
            updateClipboardItem(values.groupId!, clipboardItem)
            toast.success("Clipboard edited with success")
        } else {
            // ➕ Ajout
            addClipboardToGroup(values.groupId!, clipboardItem)
            toast.success("Clipboard added with success")
        }

        setIsOpen(false) // Ferme le dialog
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{id ? "Edit clipboard item" : "New clipboard item"}</DialogTitle>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="groupId"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a group" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {clipboardGroups?.length === 0 ? (
                                                <SelectItem value="none" disabled>
                                                    No groups available
                                                </SelectItem>
                                            ) : (
                                                <>
                                                    {clipboardGroups?.map((group) => (
                                                        <SelectItem key={group.id} value={group.id}>
                                                            {group.title}
                                                        </SelectItem>
                                                    ))}
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isPrivate"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between gap-10 rounded-lg border border-zinc-300 p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base font-medium">
                                            Hide row?
                                        </FormLabel>
                                        <FormDescription>
                                            The row will be hidden. You’ll need to click the eye icon to view it.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="grid grid-cols-2 gap-4">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
