import type { NodeData } from '$lib/node/NodeData';

export function findInputDataInNodesData(inputId: string, nodesData: NodeData[]) {
	for (const nodeData of nodesData) {
		for (const inputData of nodeData.inputs) {
			if (inputData.id === inputId) return inputData;
		}
	}
	throw new Error('Input not found');
}
