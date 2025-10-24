import { getNodeHeight } from '$lib/commands/node/move/getNodeHeight';
import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import type { GraphRegistry } from '../GraphRegistry';
import type { OrganizingNode } from './OrganizingNode';

function getInputIndex(inputDefinitions: string[], connectionData: ConnectionData): number {
	return inputDefinitions.indexOf(connectionData.inputPath.inputKey);
}

function getOrganizingNodeInputs(nodeData: NodeData, graphRegistry: GraphRegistry) {
	const nodeDefinition = nodeDefinitionsByName[nodeData.type];
	const inputDefinitions = nodeDefinition.inputs.map((inputDefinition) => {
		return inputDefinition.key;
	});

	return graphRegistry.connections
		.values()
		.filter((connectionData) => {
			return (
				connectionData.inputPath.nodeId === nodeData.id &&
				graphRegistry.nodes.getOrNull(connectionData.targetNodeId)
			);
		})
		.sort((a, b) => {
			return getInputIndex(inputDefinitions, a) - getInputIndex(inputDefinitions, b);
		})
		.map((connectionData) => {
			return connectionData.targetNodeId;
		});
}

export function getOrganizingNodeWithType(
	nodeData: NodeData,
	graphRegistry: GraphRegistry,
): OrganizingNode {
	return {
		id: nodeData.id,
		height: getNodeHeight(nodeData, graphRegistry),
		inputs: getOrganizingNodeInputs(nodeData, graphRegistry),
	};
}
