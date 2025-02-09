import { findById } from '$lib/array/findById';
import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';

export function findInputDataInNodesData(inputPath: InputPath, nodesData: NodeData[]) {
	const nodeData = findById(nodesData, inputPath.nodeId);
	for (const inputData of nodeData.inputs) {
		if (inputData.name === inputPath.inputName) {
			return inputData;
		}
	}
	throw new Error('Input not found');
}
