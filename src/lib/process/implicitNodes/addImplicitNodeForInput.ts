import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeDefinition } from '$lib/node/definitions/NodeDefinition';
import { addImplicitNodesForNode } from './addImplicitNodesForNode';
import { createImplicitConnection } from './createImplicitConnection';
import { createImplicitNode } from './createImplicitNode';

export function addImplicitNodeForInput(
	inputPath: InputPath,
	internalModuleId: string,
	graphRegistry: GraphRegistry,
	nodeDefinition: NodeDefinition,
): void {
	const implicitNode = createImplicitNode(inputPath, internalModuleId, nodeDefinition);
	graphRegistry.nodes.add(implicitNode);

	const implicitConnection = createImplicitConnection(inputPath, implicitNode.id);
	graphRegistry.connections.add(implicitConnection);

	addImplicitNodesForNode(implicitNode, graphRegistry);
}
