import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';

export type GraphData = {
	nodes: NodeData[];
	mainInternalModuleId: string;
	connections: ConnectionData[];
	internalModules: InternalModuleData[];
};
