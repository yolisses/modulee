import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
import type { Node } from '$lib/node/Node.svelte';

export function getIsSomeModuleNode(node: Node): node is ModuleNode {
	return node.type === 'ModuleNode' || node.type === 'ModuleVoicesNode';
}
