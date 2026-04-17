"use client";

import { SharePayload } from "@/type/clipboard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ImportShareView } from "@/components/share/ImportShareView";
import { decodeSharePayload } from "@/lib/shareEncoding";


// Page rendered when a user visits a share link (/share/[token]).
// Decodes the token from the URL and renders the import view if valid.
export default function SharePage() {
    const { token } = useParams<{ token: string }>();
    const [payload, setPayload] = useState<SharePayload | null>(null);

    // Decode the share payload from the URL token on mount
    useEffect(() => {
        decodeSharePayload(token).then(setPayload);
    }, [token]);

    // Show an error message if the token is invalid or could not be decoded
    if (!payload) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-3">
                <p className="text-lg font-medium">This link is invalid or has expired.</p>
            </div>
        );
    }

    return <ImportShareView payload={payload} />;
}
