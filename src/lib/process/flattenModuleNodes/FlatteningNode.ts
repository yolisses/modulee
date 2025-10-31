import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ConstantNodeData } from '$lib/node/data/variants/ConstantNodeData';
import { FlatteningConnection } from './FlatteningConnection';
import type { FlatteningModuleNode } from './FlatteningModuleNode';
import { getLast } from './getLast';

export class FlatteningNode {
	connections: FlatteningConnection[];

	constructor(
		graphRegistry: GraphRegistry,
		public nodeData: NodeData,
	) {
		this.connections = graphRegistry.connections
			.values()
			.filter((connectionData) => connectionData.inputPath.nodeId === nodeData.id)
			.map((connectionData) => new FlatteningConnection(connectionData));
	}

	flatten(result: GraphRegistry, stack: FlatteningModuleNode[]) {
		const copy = structuredClone(this.nodeData);
		const lastModuleNode = getLast(stack);
		copy.id += '_for_' + lastModuleNode.nodeData.id;
		copy.internalModuleId = lastModuleNode.nodeData.internalModuleId;
		result.nodes.add(copy);

		this.connections.forEach((connection) => {
			connection.flatten(result, stack);
		});
	}

	getIdForConnectionTarget(stack: FlatteningModuleNode[]) {
		let { id } = this.nodeData;
		const lastModuleNode = stack.at(-1);
		if (lastModuleNode) {
			id += '_for_' + lastModuleNode.nodeData.id;
		}
		return id;
	}

	createPlaceholder(result: GraphRegistry, stack: FlatteningModuleNode[], replacedNode: NodeData) {
		const placeholder: ConstantNodeData = {
			extras: { value: 0 },
			id: replacedNode.id + '_placeholder',
			internalModuleId: replacedNode.internalModuleId,
			isInputAutoConnectedMap: {},
			position: { x: 0, y: 0 },
			type: 'ConstantNode',
			unconnectedInputValues: {},
		};
		result.nodes.add(placeholder);
	}
}
