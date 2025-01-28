import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';

export type EditorData = {
	nodes: NodeData[];
	groups: GroupData[];
};
