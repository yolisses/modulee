import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';
import type { FlatteningModuleNode } from './FlatteningModuleNode';
import { FlatteningNode } from './FlatteningNode';
import { getLast } from './getLast';

export class FlatteningInputNode extends FlatteningNode {
	constructor(
		graphRegistry: GraphRegistry,
		public inputNodeData: InputNodeData,
	) {
		super(graphRegistry, inputNodeData);
	}

	flatten() {
		// do nothing
	}

	getIdForConnectionTarget(stack: FlatteningModuleNode[]) {
		// TODO check if this code does even make
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
