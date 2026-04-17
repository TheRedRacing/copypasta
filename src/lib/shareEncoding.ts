import type { SharePayload } from "@/type/clipboard";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_SHARE_SECRET ?? "copypasta-share-secret");

interface ShareJWTPayload extends JWTPayload {
    item: SharePayload["item"];
    v: 1;
}

export async function buildShareUrl(payload: SharePayload): Promise<string> {
    const token = await new SignJWT({ item: payload.item, v: 1 } satisfies ShareJWTPayload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().sign(SECRET);

    return `${window.location.origin}/share/${token}`;
}

export async function decodeSharePayload(token: string): Promise<SharePayload | null> {
    try {
        const { payload } = await jwtVerify<ShareJWTPayload>(token, SECRET);
        if (payload.v !== 1 || !payload.item) return null;
        return { version: 1, item: payload.item };
    } catch {
        return null;
    }
}
