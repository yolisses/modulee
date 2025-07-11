import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { getIsInputConnected } from '../fallbackNodes/getIsInputConnected';
import { addImplicitNodeForInput } from './addImplicitNodeForInput';

export function addImplicitNodesForNode(nodeData: NodeData, graphRegistry: GraphRegistry): void {
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
