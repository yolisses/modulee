import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { getIsInputConnected } from '../fallbackNodes/getIsInputConnected';
import { addAutoNodeForInput } from './addAutoNodeForInput';

export function addAutoNodesForNode(nodeData: NodeData, graphRegistry: GraphRegistry): void {
	const nodeDefinition = nodeDefinitionsByName[nodeData.type];
	if (!nodeDefinition) return;

	nodeDefinition.inputs.forEach((inputDefinition) => {
		if (!inputDefinition.autoConnection) return;
		if (!nodeData.isInputAutoConnectedMap[inputDefinition.key]) return;

		const inputPath: InputPath = { nodeId: nodeData.id, inputKey: inputDefinition.key };
		if (getIsInputConnected(inputPath, graphRegistry)) return;

		const autoNodeDefinition = nodeDefinitionsByName[inputDefinition.autoConnection.nodeType];
		if (!autoNodeDefinition) return;

		const { internalModuleId } = nodeData;
		addAutoNodeForInput(inputPath, internalModuleId, graphRegistry, autoNodeDefinition);
	});
}
