import { GroupNode } from '$lib/data/GroupNode.svelte';
import type { Node } from '$lib/data/Node.svelte';

export function getNodeEngineDataType(node: Node) {
	if (node instanceof GroupNode) {
		if (!node.targetGroupId) {
			throw new Error('Not implemented for undefined target group id');
		}
	}
	return node.type;
}
