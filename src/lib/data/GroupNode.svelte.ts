import { findById } from '$lib/array/findById';
import type { Group } from './Group.svelte';
import { Input } from './Input.svelte';
import { Node } from './Node.svelte';
import type { NodeData } from './NodeData';

export class GroupNode extends Node {
	targetGroup: Group = $state()!;

	constructor(nodeData: NodeData, groups: Group[]) {
		super(nodeData);

		const { targetGroupId } = nodeData.extras;
		if (typeof targetGroupId !== 'string') {
			throw new Error('Invalid type for targetGroupId. Received: ' + targetGroupId);
		}
		this.targetGroup = findById(groups, targetGroupId);
	}

	updateInputs() {
		const inputNodes = this.targetGroup.nodes.filter((node) => node.type === 'InputNode');
		this.inputs = inputNodes.map((inputNode) => {
			// TODO find a better way to create a unique id
			const id = this.id + inputNode.id;
			return new Input({ id, name: inputNode.extras.name as string }, this);
		});
	}
}
