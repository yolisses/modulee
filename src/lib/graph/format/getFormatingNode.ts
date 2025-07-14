import type { NodeData } from '$lib/node/data/NodeData';
import type { GraphRegistry } from '../GraphRegistry';
import type { FormatingNodeWithType } from './FormatingNodeWithType';

export function getFormatingNodeWithType(
	nodeData: NodeData,
	graphRegistry: GraphRegistry,
): FormatingNodeWithType {
	return {
		id: nodeData.id,
		type: nodeData.type,
		inputs: graphRegistry.connections
			.values()
			.filter((connectionData) => {
				return connectionData.inputPath.nodeId === nodeData.id;
			})
			.map((connectionData) => {
				return connectionData.targetNodeId;
			}),
	};
}
