import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import type { Vector } from 'nodes-editor';
import type { NodeType } from './NodeType';

export function createNodeData(nodeType: NodeType, position: Vector): NodeData {
	return {
		position,
		id: createId(),
		type: nodeType.name,
		extras: structuredClone(nodeType.defaultExtras),
		inputs: nodeType.inputNames.map((inputName) => ({
			id: createId(),
			name: inputName,
			connectedOutputId: undefined,
		})),
		outputs: nodeType.outputNames.map((outputName) => ({
			id: createId(),
			name: outputName,
		})),
	};
}
