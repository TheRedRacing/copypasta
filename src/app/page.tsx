"use client";

import { useEffect, useState } from "react";

import { EmptyAdd } from "@/components/add";
import Card from "@/components/card";

type ClipboardItem = {
	text: string;
	private: boolean;
};

export default function Home() {
	const [clipboard, setClipboard] = useState<ClipboardItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const clipboardText = localStorage.getItem("clipboardTexts") || "[]";
		setClipboard(JSON.parse(clipboardText));
		setLoading(false); // Une fois chargé, on enlève le loader
	}, []);

	if (loading) {
		return (
			<main className="flex-1 flex items-center justify-center p-10 sm:p-20 md:p-32 lg:p-40">
				<p className="text-lg font-semibold text-zinc-600">Chargement...</p>
			</main>
		);
	}

	if (clipboard.length === 0) {
		return (
			<main className="flex-1 flex flex-col items-center justify-center p-10 sm:p-20 md:px-32 lg:px-40">
				<EmptyAdd />
			</main>
		);
	}

	return (
		<main className="flex-1 p-4 sm:px-10 lg:px-16">
			<div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-6">
				{clipboard.map((item, index) => (
					<Card key={index} index={index} item={item} />
				))}
			</div>
		</main>
	);
}
