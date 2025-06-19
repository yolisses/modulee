import type { NodeData } from '$lib/data/NodeData';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import { NotImplementedError } from '$lib/NotImplementedError';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';

export function getNodeDataInputKeys(nodeData: NodeData) {
	if (getIsSomeModuleNodeData(nodeData)) {
		throw new NotImplementedError();
	}

	const nodeDefinition = nodeDefinitions.find((nodeDefinition) => {
		return nodeDefinition.name === nodeData.type;
	});

	if (!nodeDefinition) {
		throw new Error('Missing node definition for type ' + nodeData.type);
	}

	return nodeDefinition.inputs.map((inputDefinition) => {
		return inputDefinition.key;
	});
}
