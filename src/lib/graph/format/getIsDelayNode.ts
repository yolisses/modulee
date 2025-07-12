import type { Node } from '$lib/node/Node.svelte';

export function getIsDelayNode(node: Node) {
	return node instanceof DelayNode;
}
