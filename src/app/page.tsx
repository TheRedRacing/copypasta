"use client";

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

import Header from "@/components/header";
import Footer from "@/components/footer";
import Cookies from "@/components/cookies";
import AddGroup from "@/components/add/addGroup";

import { ClipboardCard, ClipboardGroupCard } from "@/components/clipboard";
import { useClipboard } from "@/context/ClipboardContext";

export default function Home() {
	const { clipboardGroups, loading } = useClipboard()

	// État de chargement
	if (loading) {
		return (
			<>
				<Header />
				<main className="flex-1 flex flex-col gap-4 px-4 py-4 mt-16 overflow-hidden">
					<div className="flex justify-center items-center flex-1">
						<span className="loader text-zinc-300"></span>
					</div>
				</main>
				<Cookies />
				<Footer />
			</>
		);
	}

	// Aucun groupe
	if (clipboardGroups.length === 0) {
		return (
			<>
				<Header />
				<main className="flex-1 flex flex-col gap-4 px-4 py-4 mt-16 overflow-hidden">
					<AddGroup />
				</main>
				<Cookies />
				<Footer />
			</>
		);
	}

	// Affichage normal
	return (
		<>
			<Header />
			<main className="flex-1 flex flex-col gap-4 px-4 py-4 mt-16 overflow-hidden">
				<div className="grid grid-cols-1 gap-4">
					<DndContext modifiers={[restrictToVerticalAxis, restrictToWindowEdges]} collisionDetection={closestCenter}>
						{clipboardGroups.map((clipboardGroup, clipboardGroupIDX) => (
							<ClipboardGroupCard key={clipboardGroup.id} current={clipboardGroup} index={clipboardGroupIDX} lastIndex={clipboardGroups.length - 1}>

								<SortableContext items={clipboardGroup.items}>
									<ul className="min-h-12">
										{clipboardGroup.items.map((item, index) => (
											<ClipboardCard key={item.id} item={item} groupId={clipboardGroup.id} index={index} />
										))}
									</ul>
								</SortableContext>
							</ClipboardGroupCard>
						))}
					</DndContext>
				</div>
				<AddGroup />
			</main>
			<Cookies />
			<Footer />
		</>
	);

}
