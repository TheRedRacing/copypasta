"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StreamDeckModal } from "./modal";


// ---------------------------------------------------------------------------
// StreamDeckButton
// ---------------------------------------------------------------------------
// Drop this inside the action row of <ClipboardCard />.
//
// Usage:
//   <StreamDeckButton itemId={item.id} itemLabel={item.label} />
// ---------------------------------------------------------------------------

interface StreamDeckButtonProps {
    itemId: string;
    itemLabel?: string;
}

export function StreamDeckButton({ itemId, itemLabel }: StreamDeckButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button type="button" variant="outline" size="i8" aria-label="Get Stream Deck link" onClick={() => setOpen(true)}>
                <Layers className="size-4" />
            </Button>

            <StreamDeckModal open={open} onOpenChange={setOpen} itemId={itemId} itemLabel={itemLabel} />
        </>
    );
}
