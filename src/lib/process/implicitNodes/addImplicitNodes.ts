import { getInputPathId } from '$lib/connection/getInputPathId';
import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import type { VectorData } from '$lib/data/VectorData';
import type { NodeType } from '$lib/node/definitions/NodeType';
import { nodeTypesByName } from '$lib/node/definitions/nodeTypesById';
import { getIsInputConnected } from '../fallbackNodes/getIsInputConnected';
import { getNodeInputPaths } from '../fallbackNodes/getNodeInputPaths';

function getImplicitConnectionId(inputPath: InputPath) {
	return 'implicit_connection_for_input_path_' + getInputPathId(inputPath);
}

function getImplicitNodeId(inputPath: InputPath) {
	return 'implicit_node_for_input_path_' + getInputPathId(inputPath);
}

function getIsSomeModuleNode(nodeData: NodeData) {
	return nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode';
}

export function getNodeDataFromNodeType(
	nodeId: string,
	nodeType: NodeType,
	internalModuleId: string,
	position: VectorData,
): NodeData {
	return {
		position,
		id: nodeId,
		internalModuleId,
		type: nodeType.name,
		extras: structuredClone(nodeType.defaultExtras),
	} as NodeData;
}

function getNodeTypeName(inputKey: string) {
	return inputKey[0].toUpperCase() + inputKey.slice(1) + 'Node';
}

export function createInputImplicitNode(inputPath: InputPath, nodeData: NodeData) {
	const nodeTypeName = getNodeTypeName(inputPath.inputKey);
	const nodeType = nodeTypesByName[nodeTypeName];
	if (!nodeType) return;

	const implicitNodeId = getImplicitNodeId(inputPath);
	const positionData: VectorData = { x: 0, y: 0 };
	const implicitNodeData: NodeData = getNodeDataFromNodeType(
		implicitNodeId,
		nodeType,
		nodeData.internalModuleId,
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
	graphRegistry: GraphRegistry,
) {
	const implicitNodeData = createInputImplicitNode(inputPath, nodeData);
	if (implicitNodeData) {
		graphRegistry.nodes.add(implicitNodeData);

		const implicitConnectionData: ConnectionData = createImplicitConnection(
			inputPath,
			implicitNodeData,
		);

		graphRegistry.connections.add(implicitConnectionData);

		addNodeImplicitNodes(implicitNodeData, graphRegistry);
	}
}

export function addNodeImplicitNodes(nodeData: NodeData, graphRegistry: GraphRegistry) {
	if (getIsSomeModuleNode(nodeData)) return;

	const inputPaths = getNodeInputPaths(nodeData, graphRegistry);

	inputPaths.forEach((inputPath) => {
		const isInputConnected = getIsInputConnected(inputPath, graphRegistry);
		if (isInputConnected) return;

		addInputImplicitNode(inputPath, nodeData, graphRegistry);
	});
}

// TODO consider adopting an OOP approach
export function addImplicitNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		addNodeImplicitNodes(nodeData, graphRegistry);
	});
}
