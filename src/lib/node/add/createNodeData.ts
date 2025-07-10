import { createId } from '$lib/global/createId';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import type { NodeData } from '$lib/node/data/NodeData';
import { NodeSchema } from '$lib/schemas/NodeSchema';
import type { NodeDefinition } from '../definitions/NodeDefinition';
import { createIsInputAutoConnectedMap } from './createIsInputAutoConnectedMap';
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
		isInputAutoConnectedMap: createIsInputAutoConnectedMap(nodeDefinition),
	}) as NodeData;
}
