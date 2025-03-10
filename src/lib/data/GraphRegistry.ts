import type { ById } from '$lib/editor/ById';
import type { ConnectionData } from './ConnectionData';
import type { InternalModuleData } from './InternalModuleData';
import type { NodeData } from './NodeData';

export type GraphRegistry = {
	mainInternalModuleId: string;
	nodes: ById<NodeData>;
	internalModules: ById<InternalModuleData>;
	connections: ById<ConnectionData>;
};
