"use client";

import { useEffect, useState } from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Cookies from "@/components/cookies";
import AddGroup from "@/components/add/addGroup";
import ClipboardGroupCard from "@/components/clipboard/group";
import { clipboardGroup } from "@/type/clipboard";
import { getClipboardGroups, setClipboardGroups } from "@/lib/clipboardStorage";

export default function Home() {
	const [clipboardGroups, setClipboardGroup] = useState<clipboardGroup[]>([]);
	const [loading, setLoading] = useState(true);

	// Récupérer les groupes du stockage local
	useEffect(() => {
		setClipboardGroup(getClipboardGroups());
		setTimeout(() => { setLoading(false) }, 500);
	}, []);

	const moveGroupUp = (index: number) => {
		if (index == 0) return;
		const newGroups = [...clipboardGroups];
		[newGroups[index - 1], newGroups[index]] = [newGroups[index], newGroups[index - 1]];
		setClipboardGroup(newGroups);
		setClipboardGroups(newGroups);
	};

	const moveGroupDown = (index: number) => {
		if (index === clipboardGroups.length - 1) return;
		const newGroups = [...clipboardGroups];
		[newGroups[index], newGroups[index + 1]] = [newGroups[index + 1], newGroups[index]];
		setClipboardGroup(newGroups);
		setClipboardGroups(newGroups);
	};

	const deleteGroup = (id: string) => {
		const newGroups = clipboardGroups.filter((group) => group.id !== id);
		setClipboardGroup(newGroups);
		setClipboardGroups(newGroups);
	}

	const renameGroup = (id: string, newTitle: string) => {
		const newGroups = clipboardGroups.map((group) => {
			if (group.id === id) {
				return { ...group, title: newTitle };
			}
			return group;
		});
		setClipboardGroup(newGroups);
		setClipboardGroups(newGroups);
	};

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
					<AddGroup set={setClipboardGroup} />
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
					{clipboardGroups.map((clipboardGroup, clipboardGroupIDX) => (
						<ClipboardGroupCard key={clipboardGroup.id} current={clipboardGroup} moveGroupUp={moveGroupUp} moveGroupDown={moveGroupDown} renameGroup={renameGroup} deleteGroup={deleteGroup} index={clipboardGroupIDX} lastIndex={clipboardGroups.length - 1}>
							
						</ClipboardGroupCard>
					))}
				</div>
				<AddGroup set={setClipboardGroup} />
			</main>
			<Cookies />
			<Footer />
		</>
	);

}
