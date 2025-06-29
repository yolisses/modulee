import { AudioInputNode } from './AudioInputNode';
import { ConstantNode } from './ConstantNode';
import type { NodeData } from './data/NodeData';
import { InputNode } from './InputNode';
import { ModuleNode } from './ModuleNode.svelte';
import { Node } from './Node.svelte';

export function instantiateNode(nodeData: NodeData) {
	if (nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode') {
		return new ModuleNode(nodeData);
	} else if (nodeData.type === 'ConstantNode') {
		return new ConstantNode(nodeData);
	} else if (nodeData.type === 'InputNode') {
		return new InputNode(nodeData);
	} else if (nodeData.type === 'AudioInputNode') {
		return new AudioInputNode(nodeData);
	} else {
		return new Node(nodeData);
	}
}
