import type { GroupData } from '$lib/data/GroupData';
import type { EditorCommandData } from '$lib/editor/EditorCommandData';

export type ProjectData = {
	id: string;
	name: string;
	mainGroup: GroupData;
	commands: EditorCommandData[];
};
