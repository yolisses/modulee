import type { InputPath } from '$lib/input/InputPath';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import { createNodeData } from '$lib/node/add/createNodeData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { NodeDefinition } from '$lib/node/definitions/NodeDefinition';
import { getImplicitNodeId } from './getImplicitNodeId';

export function createImplicitNode(
	inputPath: InputPath,
	internalModuleId: string,
	nodeDefinition: NodeDefinition,
): NodeData {
	const positionData: VectorData = { x: 0, y: 0 };
	const implicitNode: NodeData = createNodeData(nodeDefinition, internalModuleId, positionData);
	implicitNode.id = getImplicitNodeId(inputPath);
	return implicitNode;
}
