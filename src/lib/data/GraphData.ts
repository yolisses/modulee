import type { ById } from '$lib/editor/ById';
import type { ConnectionData } from './ConnectionData';
import type { GroupData } from './GroupData';
import type { NodeData } from './NodeData';

export type GraphData = {
	mainGroupId: string;
	nodes: ById<NodeData>;
	groups: ById<GroupData>;
	connections: ById<ConnectionData>;
};
