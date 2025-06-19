import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getIsSomeInputNodeData } from '$lib/rack/getIsSomeInputNodeData';
import type { SomeModuleNodeData } from '$lib/rack/SomeModuleNodeData';

export function getSomeModuleNodeDataInputKeys(
	moduleNodeData: SomeModuleNodeData,
	graphRegistry: GraphRegistry,
): string[] {
	const { moduleReference } = moduleNodeData.extras;
	if (!moduleReference) {
		return [];
	} else if (moduleReference.type === 'internal') {
		return graphRegistry.nodes
			.values()
			.filter((nodeData) => {
				return nodeData.internalModuleId === moduleReference.id && getIsSomeInputNodeData(nodeData);
			})
			.map((inputNodeData) => {
				return inputNodeData.id;
			});
	} else {
		const externalModuleData = graphRegistry.externalModules.get(moduleReference.id);
		const inputNodes = externalModuleData.graph.nodes.filter((nodeData) => {
			return (
				nodeData.internalModuleId === externalModuleData.graph.mainInternalModuleId &&
				getIsSomeInputNodeData(nodeData)
			);
		});
		return inputNodes.map((inputNodeData) => inputNodeData.id);
	}
}
