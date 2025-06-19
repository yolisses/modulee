import { getInputPathId } from '$lib/connection/getInputPathId';
import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import type { VectorData } from '$lib/data/VectorData';
import { createNodeData } from '$lib/node/add/createNodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
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

function getNodeDefinitionName(inputKey: string) {
	return inputKey[0].toUpperCase() + inputKey.slice(1) + 'Node';
}

export function createInputImplicitNode(inputPath: InputPath, nodeData: NodeData) {
	const nodeDefinitionName = getNodeDefinitionName(inputPath.inputKey);
	const nodeDefinition = nodeDefinitionsByName[nodeDefinitionName];
	if (!nodeDefinition) return;

	const positionData: VectorData = { x: 0, y: 0 };
	const implicitNodeData: NodeData = createNodeData(
		nodeDefinition,
		nodeData.internalModuleId,
		positionData,
	);
	implicitNodeData.id = getImplicitNodeId(inputPath);
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
/**
 * Add automatic nodes based in the node type name and the input key, e.g.:
 * create a `PitchNode` for a input which key is `"pitch"`
 */
export function addImplicitNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		addNodeImplicitNodes(nodeData, graphRegistry);
	});
}
