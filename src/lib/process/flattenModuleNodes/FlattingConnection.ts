import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { FlattingModuleNode } from './FlattingModuleNode';
import type { FlattingNode } from './FlattingNode';
import { getLast } from './getLast';

export class FlattingConnection {
	targetNode!: FlattingNode;

	constructor(public connectionData: ConnectionData) {}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		const copy = structuredClone(this.connectionData);
		const lastModuleNode = getLast(stack);
		copy.id += '_for_' + lastModuleNode.nodeData.id;
		copy.inputPath.nodeId += '_for_' + lastModuleNode.nodeData.id;
		copy.targetNodeId = this.targetNode.getIdForConnectionTarget(stack);
		result.connections.add(copy);
	}

	setTargetNode(nodeOptions: FlattingNode[]) {
		const targetNode = nodeOptions.find(
			(nodeOption) => nodeOption.nodeData.id === this.connectionData.targetNodeId,
		);
		if (!targetNode) {
			throw new Error('Missing target node', { cause: this.connectionData.targetNodeId });
		}
		this.targetNode = targetNode;
	}
}
