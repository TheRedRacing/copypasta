"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useClipboard } from "@/context/ClipboardContext";
import { buildExportPayload, downloadJson } from "@/lib/exportImport";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckedState } from "@radix-ui/react-checkbox";
import Link from "next/link";
import { useMemo, useState } from "react";

type Id = string | number;

function idToKey(id: Id): string {
    return typeof id === "number" ? String(id) : id;
}

export default function Export() {
    const { clipboardGroups, loading } = useClipboard();
    const [selected, setSelected] = useState<Record<string, boolean>>({});;

    const selectedGroups = useMemo(() => {
        const keys = new Set(
            Object.entries(selected).filter(([, v]) => v).map(([k]) => k)
        );
        return clipboardGroups.filter((g) => keys.has(idToKey(g.id)));
    }, [clipboardGroups, selected]);

    function exportAll(): void {
        const payload = buildExportPayload(clipboardGroups);
        downloadJson("copypasta-export-all.json", payload);
    }

    function exportSelected(): void {
        if (selectedGroups.length === 0) return;
        const payload = buildExportPayload(selectedGroups);
        downloadJson("copypasta-export.json", payload);
    }

    return (
        <div className="w-full flex-1 flex flex-col py-24 -space-y-px">
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-t-xl">
                <div className="aspect-square" />
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800" />
                <div className="aspect-square" />
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className="" />
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800 py-10">
                    <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">Export Data</h2>
                </div>
                <div className="" />
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className="aspect-square" />
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800" />
                <div className="aspect-square" />
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-b-xl">
                <div className="px-12 py-8 col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800">
                    <div className="flex flex-col space-y-6">
                        <div className="text-blue-600 dark:text-blue-400 bg-blue-100 p-4 border-l-4 border-blue-300 text-sm dark:bg-blue-900/50 dark:border-blue-700 flex items-center gap-4">
                            <InformationCircleIcon className="size-6 stroke-2" />
                            <span>Please note that this will export all your data in a JSON format, which can be imported back clicking <Link href="/import" className="underline">on this link</Link>.</span>
                        </div>

                        <p className="text-zinc-600 dark:text-zinc-400">
                            Select the groups you want to export, or export all your data.
                        </p>

                        <ul className="divide-y border rounded-lg border-zinc-300 dark:border-zinc-800 divide-zinc-300 dark:divide-zinc-800">
                            {clipboardGroups.map((group) => {
                                const key = idToKey(group.id);
                                return (
                                    <li key={key} className="flex items-center gap-3 p-3">
                                        <Checkbox
                                            checked={selected[key] === true}
                                            onCheckedChange={(value: CheckedState) => {
                                                const next = value === true;
                                                setSelected((s) => ({ ...s, [key]: next }));
                                            }} />
                                        <span className="flex-1 truncate">{group.title}</span>
                                        <span className="text-xs text-zinc-500">
                                            {group.items.length} items
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="grid grid-cols-4 gap-4">
                            <Button
                                variant={'secondary'}
                                onClick={exportSelected}
                                disabled={selectedGroups.length === 0}
                                className="col-start-3"
                            >
                                Export selected
                            </Button>

                            <Button
                                onClick={exportAll}
                                disabled={loading}
                            >
                                Export all
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
