import { getInputPathId } from '$lib/connection/getInputPathId';
import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphData } from '$lib/data/GraphData';
import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import type { VectorData } from '$lib/data/VectorData';
import type { NodeType } from '$lib/node/add/NodeType';
import { nodeTypesByName } from '$lib/node/add/nodeTypesById';
import { getIsInputConnected } from '../fallbackNodes/getIsInputConnected';
import { getNodeInputPaths } from '../fallbackNodes/getNodeInputPaths';

function getImplicitConnectionId(inputPath: InputPath) {
	return 'implicit_connection_for_input_path_' + getInputPathId(inputPath);
}

function getImplicitNodeId(inputPath: InputPath) {
	return 'implicit_node_for_input_path_' + getInputPathId(inputPath);
}

function getIsSomeGroupNode(nodeData: NodeData) {
	return nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode';
}

export function getNodeDataFromNodeType(
	nodeId: string,
	nodeType: NodeType,
	groupId: string,
	position: VectorData,
): NodeData {
	// TODO find a more secure way to type this result
	return {
		groupId,
		position,
		id: nodeId,
		type: nodeType.name,
		extras: structuredClone(nodeType.defaultExtras),
	} as unknown as NodeData;
}

function getNodeTypeName(inputKey: string) {
	return inputKey[0].toUpperCase() + inputKey.slice(1) + 'Node';
}

export function createInputImplicitNode(inputPath: InputPath, nodeData: NodeData) {
	const nodeTypeName = getNodeTypeName(inputPath.inputKey);
	console.log(nodeTypeName);
	const nodeType = nodeTypesByName[nodeTypeName];
	if (!nodeType) return;

	const implicitNodeId = getImplicitNodeId(inputPath);
	const positionData: VectorData = { x: 0, y: 0 };
	const implicitNodeData: NodeData = getNodeDataFromNodeType(
		implicitNodeId,
		nodeType,
		nodeData.groupId,
		positionData,
	);
	return implicitNodeData;
}

function createImplicitConnection(
	inputPath: InputPath,
	implicitNodeData: NodeData,
): ConnectionData {
	return {
		id: getImplicitConnectionId(inputPath),
		inputPath: inputPath,
		targetNodeId: implicitNodeData.id,
	};
}

export function addInputImplicitNode(
	inputPath: InputPath,
	nodeData: NodeData,
	graphData: GraphData,
) {
	const implicitNodeData = createInputImplicitNode(inputPath, nodeData);
	if (implicitNodeData) {
		graphData.nodes.add(implicitNodeData);

		const implicitConnectionData: ConnectionData = createImplicitConnection(
			inputPath,
			implicitNodeData,
		);

		graphData.connections.add(implicitConnectionData);

		addNodeImplicitNodes(implicitNodeData, graphData);
	}
}

export function addNodeImplicitNodes(nodeData: NodeData, graphData: GraphData) {
	if (getIsSomeGroupNode(nodeData)) return;

	const inputPaths = getNodeInputPaths(nodeData, graphData);

	inputPaths.forEach((inputPath) => {
		const isInputConnected = getIsInputConnected(inputPath, graphData);
		if (isInputConnected) return;
		console.log(inputPath);

		addInputImplicitNode(inputPath, nodeData, graphData);
	});
}

// TODO consider adopting an OOP approach
export function addImplicitNodes(graphData: GraphData) {
	graphData.nodes.values().forEach((nodeData) => {
		addNodeImplicitNodes(nodeData, graphData);
	});
}
