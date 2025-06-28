import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import type { VectorData } from '$lib/data/VectorData';
import { NodeSchema } from '$lib/schemas/NodeSchema';
import type { NodeDefinition } from '../definitions/NodeDefinition';
import { createUnconnectedInputValues } from './createUnconnectedInputValues';

export function createNodeData(
	nodeDefinition: NodeDefinition,
	internalModuleId: string,
	position: VectorData,
): NodeData {
	// TODO find a more secure way to type this result

	return NodeSchema.parse({
		internalModuleId,
		position,
		id: createId(),
		type: nodeDefinition.type,
		extras: structuredClone(nodeDefinition.defaultExtras),
		unconnectedInputValues: createUnconnectedInputValues(nodeDefinition),
	}) as NodeData;
}
