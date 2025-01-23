import type { CommandData } from 'modulee-nodes-editor';

export type ProjectData = {
	id: string;
	name: string;
	commands: CommandData[];
};
