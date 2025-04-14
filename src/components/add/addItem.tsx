"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea"
import { useState } from "react"

import { sendGAEvent } from '@next/third-parties/google'
import { toast } from "sonner"

const formSchema = z.object({
    text: z.string().min(2, "You must enter at least 2 characters"),
    isPrivate: z.boolean().optional(),
})

export function HeaderAdd() {
    const [isOpen, setIsOpen] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
            isPrivate: false,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Get the clipboard from the local storage.
        const clipboardText = localStorage.getItem('clipboardTexts') || '[]';
        const clipboardOrder = JSON.parse(localStorage.getItem("clipboardOrder") || "[]");

        // Add the new row to the clipboard
        const clipboard = JSON.parse(clipboardText);
        const nextId = clipboard.length + 1;
        clipboard.unshift({ id: nextId, text: values.text, isPrivate: values.isPrivate });
        clipboardOrder.unshift(nextId);

        // Save the clipboard to the local storage.
        localStorage.setItem('clipboardTexts', JSON.stringify(clipboard));
        localStorage.setItem('clipboardOrder', JSON.stringify(clipboardOrder));

        // Track the event
        sendGAEvent('event', 'add', 'row');

        // Reset the form and close the dialog.
        form.reset();
        setIsOpen(false);
        // Reload to the page / to update the clipboard.
        toast("Row added with success");
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'}>Add new</Button>
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
                                <FormItem className="flex flex-row items-center justify-between gap-10 rounded-lg border border-zinc-300 p-4 dark:border-zinc-700">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base font-medium">
                                            Hide row ?
                                        </FormLabel>
                                        <FormDescription className="">
                                            The row will be hidden and you need to click on the eye to see it.
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