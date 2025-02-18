import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
	const cookieStore = await cookies();
	await cookieStore.set("cookieConsent", "true", {
		path: "/",
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 365, // 1 an
	});

	return NextResponse.json({ success: true });
}
