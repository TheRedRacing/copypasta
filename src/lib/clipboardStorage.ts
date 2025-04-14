export type clipboardItem = {
	id: number;
	text: string;
	isPrivate: boolean;
};

export type clipboardGroup = {
	id: number;
	title: string;
	items: clipboardItem[];
};

const STORAGE_KEY = "clipboardGroups";

function getClipboardGroups(): clipboardGroup[] {
	const raw = localStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : [];
}

function saveClipboardGroups(groups: clipboardGroup[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

function addGroup(title: string): clipboardGroup {
	const groups = getClipboardGroups();
	const newGroup: clipboardGroup = {
		id: Date.now(), // ou utilise uuid si tu veux
		title,
		items: [],
	};
	const updatedGroups = [...groups, newGroup];
	saveClipboardGroups(updatedGroups);
	return newGroup;
}

// Renommer un groupe
function renameGroup(groupId: number, newTitle: string): void {
  const groups = getClipboardGroups();
  const updatedGroups = groups.map(group =>
    group.id === groupId ? { ...group, title: newTitle } : group
  );
  saveClipboardGroups(updatedGroups);
}

// Supprimer un groupe
function deleteGroup(groupId: number): void {
	const groups = getClipboardGroups().filter((group) => group.id !== groupId);
	saveClipboardGroups(groups);
}

// Réordonner les groupes (à appeler après drag & drop)
function reorderGroups(groupOrder: number[]): void {
  const groups = getClipboardGroups();
  const orderedGroups = groupOrder
    .map(id => groups.find(g => g.id === id))
    .filter(Boolean) as clipboardGroup[];

  saveClipboardGroups(orderedGroups);
}

function moveGroupUp(index: number): void {
	const groups = getClipboardGroups();
	if (index <= 0 || index >= groups.length) return;

	const reordered = [...groups];
	[reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
	saveClipboardGroups(reordered);
}

function moveGroupDown(index: number): void {
	const groups = getClipboardGroups();
	if (index < 0 || index >= groups.length - 1) return;

	const reordered = [...groups];
	[reordered[index + 1], reordered[index]] = [reordered[index], reordered[index + 1]];
	saveClipboardGroups(reordered);
}


function addClipboardToGroup(groupId: number, item: clipboardItem): void {
	const groups = getClipboardGroups();
	const updatedGroups = groups.map((group) => {
		if (group.id === groupId) {
			return {
				...group,
				items: [...group.items, item],
			};
		}
		return group;
	});
	saveClipboardGroups(updatedGroups);
}

function updateClipboardItem(groupId: number, updatedItem: clipboardItem): void {
	const groups = getClipboardGroups();
	const updatedGroups = groups.map((group) => {
		if (group.id === groupId) {
			return {
				...group,
				items: group.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
			};
		}
		return group;
	});
	saveClipboardGroups(updatedGroups);
}

function deleteClipboardItem(groupId: number, itemId: number): void {
	const groups = getClipboardGroups();
	const updatedGroups = groups.map((group) => {
		if (group.id === groupId) {
			return {
				...group,
				items: group.items.filter((item) => item.id !== itemId),
			};
		}
		return group;
	});
	saveClipboardGroups(updatedGroups);
}

export {
	getClipboardGroups,
	saveClipboardGroups,
	addGroup,
	renameGroup,
	deleteGroup,
	reorderGroups,
    moveGroupUp,
    moveGroupDown,
	addClipboardToGroup,
	updateClipboardItem,
	deleteClipboardItem,
};
