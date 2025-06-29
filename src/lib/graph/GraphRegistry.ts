import type { ById } from '$lib/editor/ById';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { InternalModuleData } from '../module/internalModule/InternalModuleData';
import type { ConnectionData } from './ConnectionData';
import type { NodeData } from './NodeData';

// TODO consider making this a class with methods fromData and getData
export type GraphRegistry = {
	nodes: ById<NodeData>;
	mainInternalModuleId: string;
	connections: ById<ConnectionData>;
	internalModules: ById<InternalModuleData>;
	externalModules: ById<ExternalModuleData>;
};
