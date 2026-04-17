import type { ClipboardItem } from "@/type/clipboard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { buildShareUrl } from "@/lib/shareEncoding";


interface ShareLinkModalProps {
    item: ClipboardItem;
    open: boolean;
    onClose: () => void;
}

// Modal dialog for sharing a clipboard item via a generated URL
export function ShareLinkModal({ item, open, onClose }: ShareLinkModalProps) {
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState("");

    // Build the share URL whenever the item changes
    useEffect(() => {
        buildShareUrl({ version: 1, item }).then(setUrl);
    }, [item]);

    // Copy the share URL to clipboard and show a toast notification
    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("Link copied!");
        // Reset the copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share this snippet</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Share <strong>{item.text}</strong> with this link:
                </p>
                <div className="flex gap-2 mt-3">
                    {/* Read-only input showing the share URL; clicking selects all text for easy copying */}
                    <input readOnly value={url} className="flex-1 truncate rounded-md border px-3 py-2 text-sm bg-muted" onClick={(e) => (e.target as HTMLInputElement).select()} />
                    <Button onClick={handleCopy}>{copied ? "Copied ✓" : "Copy"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}