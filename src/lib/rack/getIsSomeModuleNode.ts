import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
import type { Node } from '$lib/data/Node.svelte';

export function getIsSomeModuleNode(node: Node): node is ModuleNode {
	return node.type === 'ModuleNode' || node.type === 'ModuleVoicesNode';
}
