import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { nodeTypesByName } from '$lib/node/add/nodeTypesById';

function createFallbackNode(id: string, groupId: string): NodeData {
	return {
		id,
		groupId,
		type: 'ConstantNode',
		extras: { value: 0 },
		position: { x: 0, y: 0 },
	};
}

export function addFallbackNodes(graphData: GraphData) {
	const fallbackNodeId = 'fallback';
	graphData.groups.values().forEach((groupData) => {
		const fallbackNodeData = createFallbackNode(fallbackNodeId, groupData.id);
		graphData.nodes.add(fallbackNodeData);
	});

	graphData.nodes.values().forEach((nodeData) => {
		const nodeType = nodeTypesByName[nodeData.type];
		nodeType.inputNames.forEach((inputName) => {
			const isConnectionPresent = graphData.connections.values().some((connectionData) => {
				const { inputPath } = connectionData;
				return inputPath.nodeId === nodeData.id && inputPath.inputName === inputName;
			});
			if (isConnectionPresent) return;

			const connectionData: ConnectionData = {
				id: createId(),
				targetNodeId: fallbackNodeId,
				inputPath: { inputName, nodeId: nodeData.id },
			};
			graphData.connections.add(connectionData);
		});
	});
}
