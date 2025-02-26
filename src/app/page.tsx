"use client";

import { useEffect, useState } from "react";

import { EmptyAdd } from "@/components/add";
import Card from "@/components/card";

import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { clipboardItem } from "@/lib/types";

export default function Home() {
	const [clipboard, setClipboard] = useState<clipboardItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem("clipboardTexts") || "[]");
		if (savedData.length > 0) {
			setClipboard(savedData);
		}
		setLoading(false);
	}, []);

	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onDragEnd = (event: any) => {
		event.preventDefault();
		const moved = move(clipboard, event);
		setClipboard(moved);
		setTimeout(() => {
			localStorage.setItem("clipboardTexts", JSON.stringify(moved));
		}, 1000);
	}

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
		<main className="flex-1">
			<DragDropProvider onDragEnd={onDragEnd} onDragOver={(event) => {
				event.preventDefault();
			}}>
				<ListItems clipboard={clipboard} />
			</DragDropProvider>
		</main>
	);
}

interface listItemsProps {
	clipboard: clipboardItem[];
}

function ListItems({ clipboard }: listItemsProps) {
	return (
		<ul>
			{clipboard.map((item, index) => (
				<Card key={item.id} index={index} item={item} />
			))}
		</ul>
	)
}