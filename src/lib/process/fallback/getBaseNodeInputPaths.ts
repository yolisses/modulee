import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import { nodeTypesByName } from '$lib/node/add/nodeTypesById';

// TODO consider adopting an OOP approach
export function getBaseNodeInputPaths(nodeData: NodeData): InputPath[] {
	const nodeType = nodeTypesByName[nodeData.type];
	return nodeType.inputNames.map((inputName) => {
		return {
			inputKey: inputName,
			nodeId: nodeData.id,
		};
	});
}
