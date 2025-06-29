import { InputNode } from './node/InputNode.sveltevelte';
import type { Node } from '../data/node/Node.sveltee

export function getIsInputNode(node: Node): node is InputNode {
	return node instanceof InputNode;
}
