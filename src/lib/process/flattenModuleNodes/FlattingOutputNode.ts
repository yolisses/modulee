import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { OutputNodeData } from '$lib/node/data/variants/OutputNodeData';
import type { FlattingModuleNode } from './FlattingModuleNode';
import { FlattingNode } from './FlattingNode';

export class FlattingOutputNode extends FlattingNode {
	constructor(
		graphRegistry: GraphRegistry,
		public outputNodeData: OutputNodeData,
	) {
		super(graphRegistry, outputNodeData);
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {}

	getTargetNode() {
		return this.connections.at(0)?.targetNode;
	}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		const targetNode = this.getTargetNode();
		if (targetNode) {
			return targetNode.getIdForConnectionTarget(stack);
		}

		return this.outputNodeData.id + '_placeholder';
	}
}
