import type { InputPath } from '$lib/input/InputPath';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import { createNodeData } from '$lib/node/add/createNodeData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { NodeDefinition } from '$lib/node/definitions/NodeDefinition';
import { getAutoNodeId } from './getAutoNodeId';

export function createAutoNode(
	inputPath: InputPath,
	internalModuleId: string,
	nodeDefinition: NodeDefinition,
): NodeData {
	const positionData: VectorData = { x: 0, y: 0 };
	const autoNode: NodeData = createNodeData(nodeDefinition, internalModuleId, positionData);
	autoNode.id = getAutoNodeId(inputPath);
	return autoNode;
}
