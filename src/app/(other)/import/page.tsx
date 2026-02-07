"use client";

import { useState } from "react";
import { useClipboard } from "@/context/ClipboardContext";
import {
    ImportMode,
    mergeGroups,
    parseImportPayload,
    readFileAsText,
} from "@/lib/exportImport";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export default function Import() {
    const { clipboardGroups, setClipboardGroups, loading } = useClipboard();

    const [mode, setMode] = useState<ImportMode>("replace");
    const [error, setError] = useState<string | null>(null);

    async function handleFile(file: File): Promise<void> {
        try {
            const text = await readFileAsText(file);
            const payload = parseImportPayload(text);

            if (mode === "replace") {
                setClipboardGroups(payload.groups);
            } else {
                setClipboardGroups(mergeGroups(clipboardGroups, payload.groups));
            }

            setError(null);
            toast.success("Data imported successfully");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Import failed");
            toast.error("Failed to import data");
        }
    }

    return (
        <div className="w-full flex-1 flex flex-col py-24 -space-y-px">
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-t-xl">
                <div className="aspect-square" />
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800" />
                <div className="aspect-square" />
            </div>

            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div />
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800 py-10">
                    <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
                        Import Data
                    </h2>
                </div>
                <div />
            </div>

            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className="aspect-square" />
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800" />
                <div className="aspect-square" />
            </div>

            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-b-xl">
                <div className="px-12 py-8 col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800">
                    <div className="flex flex-col space-y-6">
                        <div className="text-yellow-700 bg-yellow-100 p-4 border-l-4 border-yellow-400 text-sm dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700 flex items-center gap-4">
                            <ExclamationTriangleIcon className="size-8 stroke-2" />
                            Please be careful when importing data, especially if you have a lot of important clippings. It is highly recommended to create a backup by exporting your data before proceeding.
                        </div>

                        <div className="flex gap-4 text-sm text-zinc-700 dark:text-zinc-300">
                            <label htmlFor="replace" className="flex items-center gap-2">
                                <Checkbox
                                    id="replace"
                                    checked={mode === "replace"}
                                    disabled={loading}
                                    onCheckedChange={(v: CheckedState) => {
                                        if (v === true) setMode("replace");
                                    }}
                                />
                                Replace everything
                            </label>

                            <label htmlFor="merge" className="flex items-center gap-2">
                                <Checkbox
                                    id="merge"
                                    checked={mode === "merge"}
                                    disabled={loading}
                                    onCheckedChange={(v: CheckedState) => {
                                        if (v === true) setMode("merge");
                                    }}
                                />
                                Merge
                            </label>
                        </div>

                        <Input
                            type="file"
                            accept="application/json"
                            disabled={loading}
                            onChange={(e) => {
                                const file = e.currentTarget.files?.[0];
                                if (!file) return;
                                void handleFile(file);
                                e.currentTarget.value = "";
                            }}
                        />

                        {error && (
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
