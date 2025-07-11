import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeDefinition } from '$lib/node/definitions/NodeDefinition';
import { addAutoNodesForNode } from './addAutoNodesForNode';
import { createAutoConnection } from './createAutoConnection';
import { createAutoNode } from './createAutoNode';

export function addAutoNodeForInput(
	inputPath: InputPath,
	internalModuleId: string,
	graphRegistry: GraphRegistry,
	nodeDefinition: NodeDefinition,
): void {
	const autoNode = createAutoNode(inputPath, internalModuleId, nodeDefinition);
	graphRegistry.nodes.add(autoNode);

	const autoConnection = createAutoConnection(inputPath, autoNode.id);
	graphRegistry.connections.add(autoConnection);

	addAutoNodesForNode(autoNode, graphRegistry);
}
