import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { getNodeEngineData } from './getNodeEngineData';
import { hashToUsize } from './hashToUsize';
import type { ModuleEngineData } from './ModuleEngineData';

export function getInternalModuleEngineData(
	graphRegistry: GraphRegistry,
	internalModuleData: InternalModuleData,
): ModuleEngineData {
	const moduleNodes = graphRegistry.nodes.values().filter((nodeData) => {
		return nodeData.internalModuleId === internalModuleData.id;
	});
	return {
		id: hashToUsize(internalModuleData.id),
		nodes: moduleNodes.map((nodeData) => getNodeEngineData(nodeData, graphRegistry)),
	};
}
