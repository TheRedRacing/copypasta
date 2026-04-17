"use client";

import { useClipboard } from "@/context/ClipboardContext";
import type { SharePayload } from "@/type/clipboard";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";


const schema = z.discriminatedUnion("mode", [
    z.object({
        mode: z.literal("existing"),
        groupId: z.string().min(1, "Select a group"),
    }),
    z.object({
        mode: z.literal("new"),
        newGroupName: z.string().min(1, "You need to provide a name"),
    }),
]);

type FormValues = z.infer<typeof schema>;

export function ImportShareView({ payload }: { payload: SharePayload }) {
    const router = useRouter();
    const { clipboardGroups, addGroup, addItemToGroup } = useClipboard();
    const isNewUser = clipboardGroups.length === 0;
    const { item } = payload;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: isNewUser ? { mode: "new", newGroupName: item.text ?? "" } : { mode: "existing", groupId: "" },
    });

    const mode = form.watch("mode");

    const onSubmit = (values: FormValues) => {
        const newItem = { ...item, id: crypto.randomUUID() };

        if (values.mode === "existing") {
            addItemToGroup(values.groupId, newItem);
        } else {
            addGroup({
                id: crypto.randomUUID(),
                title: values.newGroupName,
                items: [newItem],
                opened: true,
            });
        }

        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-md flex flex-col gap-6">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-semibold">Shared snippet</h1>
                    <p className="text-sm text-muted-foreground mt-1">Someone shared a snippet with you.</p>
                </div>

                <div>
                    {/* Item preview */}
                    <pre className="relative bg-zinc-100 border-l-4 border-zinc-400 px-3 py-2 font-mono text-sm dark:bg-zinc-800 dark:border-zinc-600 overflow-x-auto whitespace-pre-wrap break-all">
                    <code>{item.text}</code>
                </pre>

                    {item.isPrivate && <p className="text-sm text-muted-foreground mt-2">This item is private, so it will be hidden by default.</p>}
                </div>

                {/* Import form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {!isNewUser && (
                            <FormField
                                control={form.control}
                                name="mode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Where do you want to save this snippet?</FormLabel>
                                        <FormControl>
                                            <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-2">
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="existing" id="mode-existing" className="sr-only" />
                                                    </FormControl>
                                                    <FormLabel htmlFor="mode-existing" className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${mode === "existing" ? "border-primary-500 bg-primary-500/10" : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"}`}>
                                                        <span className="flex flex-col gap-0.5">
                                                            <span className="text-sm font-medium">Add to an existing group</span>
                                                            <span className="text-xs text-muted-foreground font-normal">Pick one of your current groups</span>
                                                        </span>
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="new" id="mode-new" className="sr-only" />
                                                    </FormControl>
                                                    <FormLabel htmlFor="mode-new" className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${mode === "new" ? "border-primary-500 bg-primary-500/10" : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"}`}>
                                                        <span className="flex flex-col gap-0.5">
                                                            <span className="text-sm font-medium">Create a new group</span>
                                                            <span className="text-xs text-muted-foreground font-normal">Start fresh with a new group</span>
                                                        </span>
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {mode === "existing" && (
                            <FormField
                                control={form.control}
                                name="groupId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Group</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a group…" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {clipboardGroups.length === 0 ? (
                                                    <SelectItem value="none" disabled>
                                                        No groups available
                                                    </SelectItem>
                                                ) : (
                                                    clipboardGroups.map((g) => (
                                                        <SelectItem key={g.id} value={g.id}>
                                                            {g.title}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {(mode === "new" || isNewUser) && (
                            <FormField
                                control={form.control}
                                name="newGroupName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{isNewUser ? "Name your workspace" : "New group name"}</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={isNewUser ? "My workspace…" : "New group name…"} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <Button type="submit" className="w-full">
                            {isNewUser ? "Create and import" : "Save"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
