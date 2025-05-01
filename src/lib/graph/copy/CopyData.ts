import type { ConnectionData } from '$lib/data/ConnectionData';
import type { NodeData } from '$lib/data/NodeData';

export type CopyData = {
	nodes: NodeData[];
	connections: ConnectionData[];
};
