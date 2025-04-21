"use server";

import { cookies } from "next/headers";

export async function hasAcceptedCookies() {
    const cookieStore = await cookies();
    return cookieStore.get("cookieConsent");
}

export async function acceptCookies() {
    const cookieStore = await cookies();
    cookieStore.set("cookieConsent", "true", {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 an
    });
}

export async function rejectCookies() {
    const cookieStore = await cookies();
    cookieStore.delete("cookieConsent");
}
