import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';

export function getNodeHeight(nodeData: NodeData, graphRegistry: GraphRegistry) {
	const { type } = nodeData;
	const definition = nodeDefinitionsByName[type];
	let height = definition.inputs.length;

	// header height
	height += 1;

	const specialTypes = new Set(['InputNode', 'ConstantNode', 'ModuleNode', 'ModuleVoicesNode']);

	if (specialTypes.has(type)) {
		height += 1;
	}

	// TODO handle cases for ModuleNodeData and ModuleVoicesNodeData
	if (getIsSomeModuleNodeData(nodeData)) {
		const someModuleNodeData = nodeData;
		const inputNodes = graphRegistry.nodes.values().filter((possibleNodeData) => {
			return (
				possibleNodeData.type === 'InputNode' &&
				possibleNodeData.internalModuleId === someModuleNodeData.extras.moduleReference?.moduleId
			);
		});
		height += inputNodes.length;
	}

	return height;
}
