import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';
import type { FlattingModuleNode } from './FlattingModuleNode';
import { FlattingNode } from './FlattingNode';
import { getLast } from './getLast';

export class FlattingInputNode extends FlattingNode {
	constructor(
		graphRegistry: GraphRegistry,
		public inputNodeData: InputNodeData,
	) {
		super(graphRegistry, inputNodeData);
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		const lastModuleNode = getLast(stack);

		if (!lastModuleNode) {
			return this.inputNodeData.id;
		}

		const targetNode = lastModuleNode?.getTargetForInputNode(this);
		if (targetNode) {
			return targetNode.getIdForConnectionTarget(stack.slice(0, -1));
		}

		return this.inputNodeData.id + '_placeholder';
	}
}
