"use client";

import { useEffect, useState } from "react";

import { EmptyAdd } from "@/components/add";
import Card from "@/components/card";

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { type clipboardItem } from "@/lib/types";
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

export default function Home() {
	const [clipboardData, setClipboardData] = useState<clipboardItem[]>([]);
	const [clipboardOrder, setclipboardOrder] = useState<number[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const savedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardTexts") || "[]");
		const savedOrder: number[] = JSON.parse(localStorage.getItem("clipboardOrder") || "[]");

		if (savedData.length > 0 && savedOrder.length > 0) {
			setClipboardData(savedData);
			setclipboardOrder(savedOrder);
		}
		setLoading(false);
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onDragEnd = (event: { active: any; over: any; }) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = clipboardOrder.indexOf(active.id);
			const newIndex = clipboardOrder.indexOf(over.id);

			if (oldIndex === -1 || newIndex === -1) return;

			// Mise à jour de l'ordre des IDs
			const newOrder = arrayMove(clipboardOrder, oldIndex, newIndex);
			setclipboardOrder(newOrder);

			// 🔥 Sauvegarde dans localStorage
			localStorage.setItem("clipboardOrder", JSON.stringify(newOrder));
		}
	};

	if (loading) {
		return (
			<main className="flex-1 flex items-center justify-center mt-16 p-10 sm:p-20 md:p-32 lg:p-40">
				<p className="text-lg font-semibold text-zinc-600">Chargement...</p>
			</main>
		);
	}

	if (clipboardData.length === 0) {
		return (
			<main className="flex-1 flex flex-col items-center justify-center mt-16 p-10 sm:p-20 md:px-32 lg:px-40">
				<EmptyAdd />
			</main>
		);
	}

	return (
		<main className="flex-1 p-4 mt-16">
			<div className="rounded-lg overflow-hidden border border-zinc-200">
				<DndContext modifiers={[restrictToVerticalAxis, restrictToWindowEdges]} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
					<SortableContext items={clipboardOrder}>
						<ListItems clipboardOrder={clipboardOrder} clipboardData={clipboardData} />
					</SortableContext>
				</DndContext>
			</div>
		</main>
	);
}

interface listItemsProps {
	clipboardOrder: number[];
	clipboardData: clipboardItem[];
}

function ListItems({ clipboardOrder, clipboardData }: listItemsProps) {
	return (
		<ul>
			{clipboardOrder.map((item, index) => {
				const data = clipboardData.find((data) => data.id === item);
				return data ? <Card key={item} index={index} item={item} data={data} /> : null;
			})}
		</ul>
	)
}