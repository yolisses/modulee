import { AudioInputNode } from './AudioInputNode';
import type { Node } from './Node.svelte';

export function getIsAudioInputNode(node: Node): node is AudioInputNode {
	return node instanceof AudioInputNode;
}
