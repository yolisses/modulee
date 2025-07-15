import { getNodeHeight } from '$lib/commands/node/getNodeHeight';
import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import type { GraphRegistry } from '../GraphRegistry';
import type { FormatingNode } from './FormatingNode';

function getInputIndex(inputDefinitions: string[], connectionData: ConnectionData): number {
	return inputDefinitions.indexOf(connectionData.inputPath.inputKey);
}

export function getFormatingNodeWithType(
	nodeData: NodeData,
	graphRegistry: GraphRegistry,
):FormatingNode {
	const nodeDefinition = nodeDefinitionsByName[nodeData.type];
	const inputDefinitions = nodeDefinition.inputs.map((inputDefinition) => {
		return inputDefinition.key;
	});

	return {
		id: nodeData.id,
		height: getNodeHeight(nodeData.type),
		inputs: graphRegistry.connections
			.values()
			.filter((connectionData) => {
				return (
					connectionData.inputPath.nodeId === nodeData.id &&
					graphRegistry.nodes.get(connectionData.targetNodeId)
				);
			})
			.sort((a, b) => {
				return getInputIndex(inputDefinitions, a) - getInputIndex(inputDefinitions, b);
			})
			.map((connectionData) => {
				return connectionData.targetNodeId;
			}),
	};
}
