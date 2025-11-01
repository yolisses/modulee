import type { FlatteningModuleNode } from './FlatteningModuleNode';

export function getIdForStack(stack: FlatteningModuleNode[]) {
	if (stack.length === 0) {
		return '';
	}

	return (
		'_for_' +
		stack
			.toReversed()
			.map((moduleNode) => moduleNode.moduleNodeData.id)
			.join('_for_')
	);
}
