"use client";

import { useEffect, useState } from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Cookies from "@/components/cookies";
import AddGroup from "@/components/add/addGroup";
import GroupCard from "@/components/card/groupCard";

import { clipboardGroup, getClipboardGroups, moveGroupUp, moveGroupDown, deleteGroup, renameGroup } from "@/lib/clipboardStorage";

export default function Home() {
	const [clipboardGroups, setClipboardGroups] = useState<clipboardGroup[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const groups = getClipboardGroups();
		setClipboardGroups(groups);
		setLoading(false);
	}, []);

	const handleMoveUp = (index: number) => {
		moveGroupUp(index);
		setClipboardGroups(getClipboardGroups());
	};

	const handleMoveDown = (index: number) => {
		moveGroupDown(index);
		setClipboardGroups(getClipboardGroups());
	};

	const handleDelete = (groupId: number) => {
		deleteGroup(groupId);
		setClipboardGroups(getClipboardGroups());
	};

	const handleRename = (groupId: number, newTitle: string) => {
		renameGroup(groupId, newTitle);
		setClipboardGroups(getClipboardGroups());
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any


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

	if (clipboardGroups.length === 0) {
		return (
			<>
				<Header />
				<main className="flex-1 flex flex-col items-center justify-center mt-16 p-10 sm:p-20 md:px-32 lg:px-40">
					<AddGroup />
				</main>
				<Cookies />
				<Footer />
			</>
		);
	}

	return (
		<>
			<Header />
			<main className="flex-1 flex flex-col gap-4 px-4 pt-6 mt-16 overflow-hidden">
				{clipboardGroups.map((clipboardGroup, clipboardGroupIDX) => (
					<GroupCard
						key={clipboardGroup.id}
						index={clipboardGroupIDX}
						lastIndex={clipboardGroups.length - 1}
						group={clipboardGroup}
						onMoveUp={handleMoveUp}
						onMoveDown={handleMoveDown}
						onDelete={handleDelete}
						onRename={handleRename}
					/>
				))}
				<AddGroup />
			</main>
			<Cookies />
			<Footer />
		</>
	);
}