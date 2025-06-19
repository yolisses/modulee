import type { ConnectionData } from './ConnectionData';
import type { InternalModuleData } from './InternalModuleData';
import type { NodeData } from './NodeData';

export type GraphData = {
	nodes: NodeData[];
	mainInternalModuleId: string;
	connections: ConnectionData[];
	internalModules: InternalModuleData[];
};
