import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';
import type { FlattingModuleNode } from './FlattingModuleNode';
import { FlattingNode } from './FlattingNode';

export class FlattingInputNode extends FlattingNode {
	constructor(
		graphRegistry: GraphRegistry,
		public inputNodeData: InputNodeData,
	) {
		super(graphRegistry, inputNodeData);
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		if (stack.length > 0) return;
		super.flatten(result, stack);
	}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		const lastModuleNode = stack.at(-1);

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
