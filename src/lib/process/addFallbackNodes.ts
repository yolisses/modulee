import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphData } from '$lib/data/GraphData';
import type { InputPath } from '$lib/data/InputPath';
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

function getNodeInputPaths(nodeData: NodeData) {
	const inputPaths: InputPath[] = [];

	const nodeType = nodeTypesByName[nodeData.type];
	nodeType.inputNames.forEach((inputName) => {
		inputPaths.push({ inputName, nodeId: nodeData.id });
	});

	return inputPaths;
}

function getIsInputConnected(inputPath: InputPath, graphData: GraphData) {
	return graphData.connections.values().some((connectionData) => {
		return getAreInputPathsEqual(inputPath, connectionData.inputPath);
	});
}

function createInputFallbackConnection(inputPath: InputPath, nodeData: NodeData): ConnectionData {
	return {
		inputPath,
		id: createId(),
		targetNodeId: getGroupFallbackNodeId(nodeData.groupId),
	};
}

function addNodeConnections(nodeData: NodeData, graphData: GraphData) {
	const inputPaths = getNodeInputPaths(nodeData);

	inputPaths.forEach((inputPath) => {
		const isInputConnected = getIsInputConnected(inputPath, graphData);
		if (isInputConnected) return;

		const inputFallbackConnection = createInputFallbackConnection(inputPath, nodeData);
		graphData.connections.add(inputFallbackConnection);
	});
}

export function addFallbackNodes(graphData: GraphData) {
	graphData.groups.values().forEach((groupData) => {
		const fallbackNodeData = createFallbackNode(groupData.id);
		graphData.nodes.add(fallbackNodeData);
	});
	graphData.nodes.values().forEach((nodeData) => addNodeConnections(nodeData, graphData));
}
