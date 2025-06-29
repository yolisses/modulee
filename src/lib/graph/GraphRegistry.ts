import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { ById } from '$lib/editor/ById';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { InternalModuleData } from '../module/internalModule/InternalModuleData';

// TODO consider making this a class with methods fromData and getData
export type GraphRegistry = {
	nodes: ById<NodeData>;
	mainInternalModuleId: string;
	connections: ById<ConnectionData>;
	internalModules: ById<InternalModuleData>;
	externalModules: ById<ExternalModuleData>;
};
