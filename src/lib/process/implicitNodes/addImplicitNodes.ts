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

function createImplicitNode(
	inputPath: InputPath,
	internalModuleId: string,
	nodeDefinition: NodeDefinition,
): NodeData {
	const positionData: VectorData = { x: 0, y: 0 };
	const implicitNode: NodeData = createNodeData(nodeDefinition, internalModuleId, positionData);
	implicitNode.id = getImplicitNodeId(inputPath);
	return implicitNode;
}

function createImplicitConnection(inputPath: InputPath, implicitNode: NodeData): ConnectionData {
	return {
		id: getImplicitConnectionId(inputPath),
		inputPath,
		targetNodeId: implicitNode.id,
	};
}

function addImplicitNodeForInput(
	inputPath: InputPath,
	internalModuleId: string,
	graphRegistry: GraphRegistry,
	nodeDefinition: NodeDefinition,
): void {
	const implicitNode = createImplicitNode(inputPath, internalModuleId, nodeDefinition);
	graphRegistry.nodes.add(implicitNode);

	const implicitConnection = createImplicitConnection(inputPath, implicitNode);
	graphRegistry.connections.add(implicitConnection);

	addImplicitNodesForNode(implicitNode, graphRegistry);
}

function addImplicitNodesForNode(nodeData: NodeData, graphRegistry: GraphRegistry): void {
	const nodeDefinition = nodeDefinitionsByName[nodeData.type];
	if (!nodeDefinition) return;

	nodeDefinition.inputs.forEach((inputDefinition) => {
		if (!inputDefinition.autoConnection) return;
		if (!nodeData.isInputAutoConnectedMap[inputDefinition.key]) return;

		const inputPath: InputPath = { nodeId: nodeData.id, inputKey: inputDefinition.key };
		if (getIsInputConnected(inputPath, graphRegistry)) return;

		const implicitNodeDefinition = nodeDefinitionsByName[inputDefinition.autoConnection.nodeType];
		if (!implicitNodeDefinition) return;

		const { internalModuleId } = nodeData;
		addImplicitNodeForInput(inputPath, internalModuleId, graphRegistry, implicitNodeDefinition);
	});
}

export function addImplicitNodes(graphRegistry: GraphRegistry): void {
	graphRegistry.nodes.values().forEach((node) => {
		addImplicitNodesForNode(node, graphRegistry);
	});
}
