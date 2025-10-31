import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ConstantNodeData } from '$lib/node/data/variants/ConstantNodeData';
import { FlattingConnection } from './FlattingConnection';
import type { FlattingModuleNode } from './FlattingModuleNode';
import { getLast } from './getLast';

export class FlattingNode {
	connections: FlattingConnection[];

	constructor(
		graphRegistry: GraphRegistry,
		public nodeData: NodeData,
	) {
		this.connections = graphRegistry.connections
			.values()
			.filter((connectionData) => connectionData.inputPath.nodeId === nodeData.id)
			.map((connectionData) => new FlattingConnection(connectionData));
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		const copy = structuredClone(this.nodeData);
		const lastModuleNode = getLast(stack);
		copy.id += '_for_' + lastModuleNode.nodeData.id;
		copy.internalModuleId = lastModuleNode.nodeData.internalModuleId;
		result.nodes.add(copy);

		this.connections.forEach((connection) => {
			connection.flatten(result, stack);
		});
	}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		let { id } = this.nodeData;
		console.log(id, stack);

		const lastModuleNode = getLast(stack);
		id += '_for_' + lastModuleNode.nodeData.id;
		return id;
	}

	createPlaceholder(result: GraphRegistry, stack: FlattingModuleNode[], replacedNode: NodeData) {
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
