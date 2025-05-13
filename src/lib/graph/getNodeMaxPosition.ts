import type { Node } from '$lib/data/Node.svelte';
import { getNodeSize } from './getNodeSize';

export function getNodeMaxPosition(node: Node) {
	return node.position.add(getNodeSize(node));
}
