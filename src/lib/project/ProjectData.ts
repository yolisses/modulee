import type { GroupData } from '$lib/data/GroupData';
import type { CommandData } from '$lib/editor/CommandData';

export type ProjectData = {
	id: string;
	name: string;
	mainGroup: GroupData;
	commands: CommandData[];
};
