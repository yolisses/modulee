import type { ConnectionData } from '$lib/connection/ConnectionData';
import { getInputPathId } from '$lib/connection/getInputPathId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import { createNodeData } from '$lib/node/add/createNodeData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { NodeDefinition } from '$lib/node/definitions/NodeDefinition';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { getIsInputConnected } from '../fallbackNodes/getIsInputConnected';

function getImplicitConnectionId(inputPath: InputPath) {
	return 'implicit_connection_for_input_path_' + getInputPathId(inputPath);
}

function getImplicitNodeId(inputPath: InputPath) {
	return 'implicit_node_for_input_path_' + getInputPathId(inputPath);
}

export function createInputImplicitNode(
	inputPath: InputPath,
	nodeData: NodeData,
	nodeDefinition: NodeDefinition,
) {
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
	nodeDefinition: NodeDefinition,
) {
	const implicitNodeData = createInputImplicitNode(inputPath, nodeData, nodeDefinition);
	graphRegistry.nodes.add(implicitNodeData);

	const implicitConnectionData: ConnectionData = createImplicitConnection(
		inputPath,
		implicitNodeData,
	);
	graphRegistry.connections.add(implicitConnectionData);

	addNodeImplicitNodes(implicitNodeData, graphRegistry);
}

export function addNodeImplicitNodes(nodeData: NodeData, graphRegistry: GraphRegistry) {
	const nodeDefinition = nodeDefinitionsByName[nodeData.type];
	nodeDefinition.inputs.forEach((inputDefinition) => {
		if (!nodeData.isInputAutoConnectedMap[inputDefinition.key]) return;

		if (!inputDefinition.autoConnection) return;
		const inputPath: InputPath = { nodeId: nodeData.id, inputKey: inputDefinition.key };
		if (getIsInputConnected(inputPath, graphRegistry)) return;

		const implicitNodeDefinition = nodeDefinitionsByName[inputDefinition.autoConnection.nodeType];
		if (!implicitNodeDefinition) return;

		addInputImplicitNode(inputPath, nodeData, graphRegistry, implicitNodeDefinition);
	});
}

export function addImplicitNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		addNodeImplicitNodes(nodeData, graphRegistry);
	});
}
