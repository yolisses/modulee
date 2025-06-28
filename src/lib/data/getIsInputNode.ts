import { InputNode } from './InputNode.svelte';
import type { Node } from './Node.svelte';

export function getIsInputNode(node: Node): node is InputNode {
	return node instanceof InputNode;
}
