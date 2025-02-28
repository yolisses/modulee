import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { nodeTypesByName } from '$lib/node/add/nodeTypesById';

function getGroupFallbackNodeId(groupId: string) {
	return 'fallback' + groupId;
}

function createFallbackNode(groupId: string): NodeData {
	return {
		groupId,
		type: 'ConstantNode',
		extras: { value: 0 },
		position: { x: 0, y: 0 },
		id: getGroupFallbackNodeId(groupId),
	};
}

function addNodeConnections(nodeData: NodeData, graphData: GraphData) {
	const nodeType = nodeTypesByName[nodeData.type];
	nodeType.inputNames.forEach((inputName) => {
		const isConnectionPresent = graphData.connections.values().some((connectionData) => {
			const { inputPath } = connectionData;
			return inputPath.nodeId === nodeData.id && inputPath.inputName === inputName;
		});
		if (isConnectionPresent) return;

		const connectionData: ConnectionData = {
			id: createId(),
			inputPath: { inputName, nodeId: nodeData.id },
			targetNodeId: getGroupFallbackNodeId(nodeData.groupId),
		};
		graphData.connections.add(connectionData);
	});
}

export function addFallbackNodes(graphData: GraphData) {
	graphData.groups.values().forEach((groupData) => {
		const fallbackNodeData = createFallbackNode(groupData.id);
		graphData.nodes.add(fallbackNodeData);
	});
	graphData.nodes.values().forEach((nodeData) => addNodeConnections(nodeData, graphData));
}
