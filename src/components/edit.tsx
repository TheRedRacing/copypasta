"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Button, ButtonCard } from "@/components/ui/button";
import { Textarea } from "./ui/textarea"
import { PencilIcon } from "@heroicons/react/24/outline"
import { clipboardItem, itemClipboardItem } from "@/lib/types"
import { toast } from "sonner"

const formSchema = z.object({
    text: z.string().min(2, "You must enter at least 2 characters"),
    isPrivate: z.boolean().optional(),
})

export default function EditDialog({ item }: itemClipboardItem) {
    const [isOpen, setIsOpen] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: item.text,
            isPrivate: item.isPrivate,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const clipboardText = localStorage.getItem('clipboardTexts') || '[]';
        const clipboard = JSON.parse(clipboardText);
        const index = clipboard.findIndex((i: clipboardItem) => i.id === item.id);
        clipboard[index] = {
            id: item.id,
            text: values.text,
            isPrivate: values.isPrivate,
        };
        localStorage.setItem('clipboardTexts', JSON.stringify(clipboard));
        form.reset();
        setIsOpen(false);
        toast("Row updated with success");
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <ButtonCard onClick={() => setIsOpen(!isOpen)}>
                    <PencilIcon className="size-5" />
                </ButtonCard>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>
                                Add a new row ?
                            </DialogTitle>
                        </DialogHeader>
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
                                            Hide row ?
                                        </FormLabel>
                                        <FormDescription className="">
                                            The row will be hide and you need to click on the eye to see it.
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
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" size={'form'}>
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" size={'form'}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}