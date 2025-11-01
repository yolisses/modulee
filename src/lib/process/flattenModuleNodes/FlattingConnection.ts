import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { FlatteningModuleNode } from './FlatteningModuleNode';
import type { FlatteningNode } from './FlatteningNode';
import { getIdForStack } from './getIdForStack';

export class FlatteningConnection {
	targetNode!: FlatteningNode;

	constructor(public connectionData: ConnectionData) {}

	flatten(result: GraphRegistry, stack: FlatteningModuleNode[]) {
		const copy = structuredClone(this.connectionData);
		copy.id += getIdForStack(stack);
		copy.inputPath.nodeId += getIdForStack(stack);
		copy.targetNodeId = this.targetNode.getIdForConnectionTarget(stack);
		result.connections.add(copy);
	}

	setTargetNode(nodeOptions: FlatteningNode[]) {
		const targetNode = nodeOptions.find(
			(nodeOption) => nodeOption.nodeData.id === this.connectionData.targetNodeId,
		);
		if (!targetNode) {
			throw new Error('Missing target node', { cause: this.connectionData.targetNodeId });
		}
		this.targetNode = targetNode;
	}
}
