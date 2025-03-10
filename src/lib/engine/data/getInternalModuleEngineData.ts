import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { getNodeEngineData } from './getNodeEngineData';
import { hashToUsize } from './hashToUsize';
import type { InternalModuleEngineData } from './InternalModuleEngineData';

// TODO use just InternalModuleData instead of internalModule
export function getInternalModuleEngineData(
	internalModuleData: InternalModuleData,
	graphRegistry: GraphRegistry,
): InternalModuleEngineData {
	const internalModuleNodes = graphRegistry.nodes.values().filter((nodeData) => {
		return nodeData.internalModuleId === internalModuleData.id;
	});
	return {
		id: hashToUsize(internalModuleData.id),
		nodes: internalModuleNodes.map((nodeData) => getNodeEngineData(nodeData, graphRegistry)),
	};
}
