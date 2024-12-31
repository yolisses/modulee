import { Vector } from '$lib/space/Vector';
import { createId } from '$lib/utils/createId';
import { defaultNodeSize } from './defaultNodeSize';
import type { NodeData } from './NodeData';

export function createNodeData(position: Vector): NodeData {
	return {
		id: createId(),
		connectors: [],
		size: defaultNodeSize,
		position: position.subtract(defaultNodeSize.divide(Vector.fromNumber(2))),
	};
}
