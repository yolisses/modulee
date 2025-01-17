import { Vector } from 'nodes-editor';
import { createId } from './data/createId';
import type { NodeData } from './data/NodeData';
import { defaultNodeSize } from './defaultNodeSize';

export function createNodeData(position: Vector): NodeData {
	return {
		extras: {},
		outputs: [],
		id: createId(),
		type: 'DevNode',
		position: position.subtract(defaultNodeSize.divide(Vector.fromNumber(2))),
		inputs: [
			{ id: createId(), name: 'input1' },
			{ id: createId(), name: 'input2' },
			{ id: createId(), name: 'input3' },
		],
	};
}
