import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import type { Command } from './Command';

export type EditorData = {
	nodes: NodeData[];
	history: Command[];
	groups: GroupData[];
	undoneHistory: Command[];
};
