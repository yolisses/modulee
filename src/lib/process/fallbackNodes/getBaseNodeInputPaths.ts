import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import { nodeTypesByName } from '$lib/node/definitions/nodeTypesById';

// TODO consider adopting an OOP approach
export function getBaseNodeInputPaths(nodeData: NodeData): InputPath[] {
	const nodeType = nodeTypesByName[nodeData.type];
	return nodeType.inputs.map((input) => {
		return {
			nodeId: nodeData.id,
			inputKey: input.key,
		};
	});
}
