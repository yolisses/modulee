import type { Node } from '$lib/node/Node.svelte';
import { getNodeSize } from './getNodeSize';

export function getNodeMaxPosition(node: Node) {
	return node.position.add(getNodeSize(node));
}
