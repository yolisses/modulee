import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import { nodeTypesByName } from '$lib/node/add/nodeTypesById';

// TODO consider adopting an OOP approach
export function getBaseNodeInputPaths(nodeData: NodeData) {
	const inputPaths: InputPath[] = [];

	const nodeType = nodeTypesByName[nodeData.type];
	nodeType.inputNames.forEach((inputName) => {
		inputPaths.push({ inputName, nodeId: nodeData.id });
	});

	return inputPaths;
}
