import type { ById } from '$lib/editor/ById';
import type { ConnectionData } from './ConnectionData';
import type { ExternalModuleReference } from './ExternalModuleReference';
import type { InternalModuleData } from './InternalModuleData';
import type { NodeData } from './NodeData';

// TODO consider making this a class with methods fromData and getData
export type GraphRegistry = {
	nodes: ById<NodeData>;
	mainInternalModuleId: string;
	connections: ById<ConnectionData>;
	internalModules: ById<InternalModuleData>;
	externalModuleReferences: ById<ExternalModuleReference>;
};
