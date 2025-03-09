'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Cookies() {
    const [isAccepted, setIsAccepted] = useState<boolean | null>(true);

    // Vérifier les cookies côté client
    useEffect(() => {
        const checkCookies = () => {
            const hasConsent = document.cookie.includes("cookieConsent=true");
            setIsAccepted(hasConsent);
        };

        checkCookies();
    }, []);

    // Appeler l'API côté serveur pour accepter les cookies
    const acceptCookies = async () => {
        await fetch("/api/accept-cookies", { method: "POST" });
        setIsAccepted(true);
    };

    // Appeler l'API côté serveur pour refuser les cookies
    const rejectCookies = async () => {
        await fetch("/api/reject-cookies", { method: "POST" });
        setIsAccepted(false);
    };

    if (isAccepted) return null;

    return (
        <div className="mb-4 px-4 sm:px-6 lg:px-12">
            <div className="rounded-lg flex flex-col justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-zinc-200 md:flex-row md:items-center lg:px-8 dark:bg-dark-header dark:ring-0">
                <p className="max-w-5xl text-sm/6 text-zinc-900 dark:text-zinc-100">
                    {"This website does not use any database. All items are stored locally in your browser's localStorage. If you clear your site data or browser storage, all saved items will be permanently lost. Learn more in our"} <a href="/help" className="text-primary-500 underline">Help Center</a>.
                </p>
                <div className="flex flex-none items-center gap-x-5">
                    <Button onClick={() => acceptCookies()}>
                        Accept all
                    </Button>
                    <Button variant={"outline"} onClick={() => rejectCookies()}>
                        Reject all
                    </Button>
                </div>
            </div>
        </div>
    )
}
