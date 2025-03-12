"use client";

import { useEffect, useState } from "react";

import { EmptyAdd } from "@/components/add";
import Card, { ArchivedCard } from "@/components/card";

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { type clipboardItem } from "@/lib/types";
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Cookies from "@/components/cookies";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	const [clipboardData, setClipboardData] = useState<clipboardItem[]>([]);
	const [clipboardOrder, setclipboardOrder] = useState<number[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const savedData: clipboardItem[] = JSON.parse(localStorage.getItem("clipboardArchive") || "[]");
		const savedOrder: number[] = JSON.parse(localStorage.getItem("clipboardArchiveOrder") || "[]");

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
			<>
				<Header />
				<main className="flex-1 flex items-center justify-center mt-16 p-10 sm:p-20 md:p-32 lg:p-40">
					<p className="text-lg font-semibold text-zinc-600">Chargement...</p>
				</main>
				<Cookies />
				<Footer />
			</>
		);
	}

	if (clipboardData.length === 0) {
		return (
			<>
				<Header />
				<main className="flex-1 flex flex-col items-center justify-center mt-16 p-10 sm:p-20 md:px-32 lg:px-40">
					<Link
						href="/"
						className={cn("relative flex-1 flex items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-zinc-300 p-24 text-center hover:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:hover:border-zinc-600")}
					>
						<div className="text-center">
							<h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
								No archived data available
							</h3>
							<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
								Return to the home page to add a new row.
							</p>							
						</div>
					</Link>
				</main>
				<Cookies />
				<Footer />
			</>
		);
	}

	return (
		<>
			<Header />
			<main className="flex-1 px-4 pt-6 mt-16 overflow-hidden">
				<DndContext modifiers={[restrictToVerticalAxis, restrictToWindowEdges]} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
					<SortableContext items={clipboardOrder}>
						<ListItems clipboardOrder={clipboardOrder} clipboardData={clipboardData} />
					</SortableContext>
				</DndContext>
			</main>
			<Cookies />
			<Footer />
		</>
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
				return data ? <ArchivedCard key={item} index={index} item={item} data={data} /> : null;
			})}
		</ul>
	)
}