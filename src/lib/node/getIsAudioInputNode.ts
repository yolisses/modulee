import type { Node } from '../Node.sveltee';
import { AudioInputNode } from './AudioInputNode.svelte

export function getIsAudioInputNode(node: Node): node is AudioInputNode {
	return node instanceof AudioInputNode;
}
