"use client";

import { useState } from "react";
import { Check, Copy, Layers } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// ---------------------------------------------------------------------------
// StreamDeckModal
// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface StreamDeckModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    itemId: string;
    itemLabel?: string;
}

export function StreamDeckModal({ open, onOpenChange, itemId, itemLabel }: StreamDeckModalProps) {
    const [copied, setCopied] = useState(false);

    // Build the full URL from the current origin so it works on every environment
    // (localhost, staging, production).
    const origin = typeof window !== "undefined" ? window.location.origin : "https://copypasta.ch";
    const url = `${origin}/streamdeck/${itemId}`;

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success("URL copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Failed to copy URL");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Layers className="h-4 w-4 shrink-0" />
                        Stream Deck link
                        {itemLabel && <span className="text-muted-foreground font-normal truncate">— {itemLabel}</span>}
                    </DialogTitle>
                    <DialogDescription>
                        In Stream Deck, add an <strong className="text-foreground">Open URL</strong> action and paste this link. Each press will instantly copy this entry to your clipboard.
                    </DialogDescription>
                </DialogHeader>

                {/* URL row */}
                <div className="flex items-center gap-2 mt-1">
                    <Input readOnly value={url} className="font-mono text-xs" onFocus={(e) => e.target.select()} />
                    <Button type="button" size="default" variant="outline" onClick={handleCopy} aria-label="Copy Stream Deck URL" className="shrink-0">
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Step-by-step hint */}
                <ol className="text-muted-foreground text-xs space-y-1 list-decimal list-inside mt-2">
                    <li>Open Stream Deck software and pick a button.</li>
                    <li>
                        Add a <strong className="text-foreground">Website</strong> / <strong className="text-foreground">Open URL</strong> action.
                    </li>
                    <li>Paste the URL above and save.</li>
                    <li>Press the physical button — text is copied instantly.</li>
                </ol>
            </DialogContent>
        </Dialog>
    );
}
