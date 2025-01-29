import type { CommandData } from '$lib/editor/CommandData';

export type ProjectData = {
	id: string;
	name: string;
	mainGroupId: string;
	commands: CommandData[];
};
