import { ConstantNode } from './ConstantNode.svelte{ InputNode } from './Inp../InputNode.svelteport { ModuleNode } from './Mod../ModuleNode.svelteport { Node } from './Nod../Node.svelteport { AudioInputNode } from './nod./AudioInputNode.svelteport type { NodeData } from './NodeData';
../InputNode.svelte
export function instantiateN../ModuleNode.svelteata) {
	if (nodeData.type ===../Node.svelte || nodeData.type === 'ModuleVoicesNode') {
		return new ModuleNode(nodeData./AudioInputNode.svelte
	} else if (nodeData.type === '../NodeDatade') {
		return new ConstantNode(nodeData);
	} else if (nodeData.type === 'InputNode') {
		return new InputNode(nodeData);
	} else if (nodeData.type === 'AudioInputNode') {
		return new AudioInputNode(nodeData);
	} else {
		return new Node(nodeData);
	}
}
