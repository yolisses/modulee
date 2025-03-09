import type { ConnectionData } from './ConnectionData';
import type { GroupData } from './GroupData';
import type { NodeData } from './NodeData';

export type GraphData = {
	nodes: NodeData[];
	groups: GroupData[];
	mainGroupId: string;
	connections: ConnectionData[];
};
