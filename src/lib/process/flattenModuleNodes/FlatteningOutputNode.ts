import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { OutputNodeData } from '$lib/node/data/variants/OutputNodeData';
import type { FlatteningModuleNode } from './FlatteningModuleNode';
import { FlatteningNode } from './FlatteningNode';

export class FlatteningOutputNode extends FlatteningNode {
	constructor(
		graphRegistry: GraphRegistry,
		public outputNodeData: OutputNodeData,
	) {
		super(graphRegistry, outputNodeData);
	}

	flatten(result: GraphRegistry, stack: FlatteningModuleNode[]) {}

	getTargetNode() {
		return this.connections.at(0)?.targetNode;
	}

	getIdForConnectionTarget(stack: FlatteningModuleNode[]) {
		const targetNode = this.getTargetNode();
		if (targetNode) {
			return targetNode.getIdForConnectionTarget(stack);
		}

		return this.outputNodeData.id + '_placeholder';
	}
}
