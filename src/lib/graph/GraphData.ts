import type { InternalModuleData } from '../module/internalModule/InternalModuleData';
import type { ConnectionData } from './ConnectionData';
import type { NodeData } from './NodeData';

export type GraphData = {
	nodes: NodeData[];
	mainInternalModuleId: string;
	connections: ConnectionData[];
	internalModules: InternalModuleData[];
};
