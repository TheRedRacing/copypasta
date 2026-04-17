"use client";

import { useClipboard } from "@/context/ClipboardContext";
import { ClipboardItemOrNull } from "@/type/clipboard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

type Status = "loading" | "success" | "not_found" | "error";

export default function StreamDeckPage() {
    const params = useParams();
    const id = params?.id as string;
    const { clipboardGroups, loading } = useClipboard();
    const [label, setLabel] = useState<string>("");
    const [status, setStatus] = useState<Status>("loading");

    useEffect(() => {
        if (loading) return;
        if (!id) {
            setStatus("not_found");
            return;
        }

        let found: ClipboardItemOrNull = null;

        for (const group of clipboardGroups) {
            const item = group.items?.find((i) => i.id === id);
            if (item) {
                found = item;
                break;
            }
        }

        if (!found) {
            setStatus("not_found");
            return;
        }

        setLabel(found.text);

        navigator.clipboard
            .writeText(found.text)
            .then(() => {
                setStatus("success");
                setTimeout(() => window.close(), 800);
            })
            .catch(() => {
                setStatus("error");
            });
    }, [loading, clipboardGroups, id]);

    return (
        <div className={"flex flex-col items-center justify-center h-[100svh] bg-zinc-50 dark:bg-dark-main text-zinc-900 dark:text-zinc-100"}>
            {loading ? (
                <p className="text-sm text-zinc-400">Copying…</p>
            ) : status === "success" ? (
                <div className="flex flex-col items-center gap-2 text-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <p className="text-sm text-green-500">Success</p>
                    <p className="text-sm text-green-500">{`"${label}" copied with success`}</p>
                </div>
            ) : status === "not_found" ? (
                <div className="flex flex-col items-center gap-2 text-center max-w-md px-4">
                    <AlertCircle className="h-8 w-8 text-red-400" />
                    <p className="text-sm text-red-400">Entry not found</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">This Stream Deck link is no longer valid. The entry may have been deleted.</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Go to{" "}
                        <Link className={"underline"} href={"https://www.copy-pasta.ch/"}>
                            www.copy-pasta.ch
                        </Link>{" "}
                        and create a new Stream Deck link.
                    </p>
                </div>
            ) : (
                status === "error" && (
                    <div className="flex flex-col items-center gap-2 text-center max-w-md px-4">
                        <XCircle className="h-8 w-8 text-red-400" />
                        <p className="text-sm text-red-400">Clipboard access denied</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">The browser blocked clipboard access. Make sure the page is opened via Stream Deck, not a new tab.</p>
                    </div>
                )
            )}
        </div>
    );
}
