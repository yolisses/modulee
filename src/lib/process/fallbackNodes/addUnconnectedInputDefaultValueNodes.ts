import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ConstantNodeData } from '$lib/data/variants/ConstantNodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { Vector } from 'nodes-editor';

export function addUnconnectedInputDefaultValueNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		const nodeDefinition = nodeDefinitionsByName[nodeData.type];

		// To improve performance
		if (nodeDefinition.inputs.length === 0) return;

		const isInputConnected: Record<string, boolean> = {};

		graphRegistry.connections.values().filter((connectionData) => {
			const { inputPath } = connectionData;
			if (inputPath.nodeId === nodeData.id) {
				isInputConnected[inputPath.inputKey] = true;
			}
		});

		nodeDefinition.inputs.forEach((inputDefinition) => {
			const { key } = inputDefinition;
			if (isInputConnected[inputDefinition.key]) return;

			const defaultValue = nodeData.unconnectedInputValues[key];
			const constantNodeData: ConstantNodeData = {
				id: createId(),
				type: 'ConstantNode',
				position: Vector.zero(),
				unconnectedInputValues: {},
				extras: { value: defaultValue },
				internalModuleId: nodeData.internalModuleId,
			};
			graphRegistry.nodes.add(constantNodeData);

			const connectionData: ConnectionData = {
				id: createId(),
				targetNodeId: constantNodeData.id,
				inputPath: { nodeId: nodeData.id, inputKey: key },
			};
			graphRegistry.connections.add(connectionData);
		});
	});
}
