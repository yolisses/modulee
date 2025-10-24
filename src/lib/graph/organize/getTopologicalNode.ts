import type { NodeData } from '$lib/node/data/NodeData';
import type { GraphRegistry } from '../GraphRegistry';
import type { TopologicalNode } from './TopologicalNode';

export function getTopologicalNode(
	nodeData: NodeData,
	graphRegistry: GraphRegistry,
): TopologicalNode {
	return {
		id: nodeData.id,
		isDelay: nodeData.type === 'DelayNode',
		inputs: graphRegistry.connections
			.values()
			.filter((connectionData) => {
				return (
					connectionData.inputPath.nodeId === nodeData.id &&
					graphRegistry.nodes.getOrNull(connectionData.targetNodeId)
				);
			})
			.map((connectionData) => {
				return connectionData.targetNodeId;
			}),
	};
}
