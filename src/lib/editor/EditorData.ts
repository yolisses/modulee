import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import type { CommandData } from './CommandData';

export type EditorData = {
	nodes: NodeData[];
	groups: GroupData[];
	history: CommandData[];
	undoneHistory: CommandData[];
};
