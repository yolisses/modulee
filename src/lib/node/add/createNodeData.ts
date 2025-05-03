import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import type { VectorData } from '$lib/data/VectorData';
import type { NodeType } from '../definitions/NodeType';

export function createNodeData(
	nodeType: NodeType,
	internalModuleId: string,
	position: VectorData,
): NodeData {
	// TODO find a more secure way to type this result
	return {
		internalModuleId,
		position,
		id: createId(),
		type: nodeType.name,
		extras: structuredClone(nodeType.defaultExtras),
	} as unknown as NodeData;
}
