import { ConstantNode } from './ConstantNode.svelte';
import { InputNode } from './InputNode.svelte';
import { InternalModuleNode } from './InternalModuleNode.svelte';
import { Node } from './Node.svelte';
import type { NodeData } from './NodeData';

export function instantiateNode(nodeData: NodeData) {
	if (nodeData.type === 'InternalModuleNode' || nodeData.type === 'InternalModuleVoicesNode') {
		return new InternalModuleNode(nodeData);
	} else if (nodeData.type === 'ConstantNode') {
		return new ConstantNode(nodeData);
	} else if (nodeData.type === 'InputNode') {
		return new InputNode(nodeData);
	} else {
		return new Node(nodeData);
	}
}
