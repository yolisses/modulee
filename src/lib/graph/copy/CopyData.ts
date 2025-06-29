import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { NodeData } from '$lib/node/data/NodeData';

export type CopyData = {
	nodes: NodeData[];
	connections: ConnectionData[];
};
