import { ConstantNode } from './ConstantNode.svelte';
import { GroupNode } from './GroupNode.svelte';
import { InputNode } from './InputNode.svelte';
import { Node } from './Node.svelte';
import type { NodeData } from './NodeData';

export function instantiateNode(nodeData: NodeData) {
	if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
		return new GroupNode(nodeData);
	} else if (nodeData.type === 'ConstantNode') {
		return new ConstantNode(nodeData);
	} else if (nodeData.type === 'InputNode') {
		return new InputNode(nodeData);
	} else {
		return new Node(nodeData);
	}
}
