import type { ById } from '$lib/editor/ById.svelte';
import type { ConnectionData } from './ConnectionData';
import type { Group } from './Group.svelte';
import { Input } from './Input.svelte';
import { Node } from './Node.svelte';
import type { NodeData } from './NodeData';

export class GroupNode extends Node {
	targetGroupId: string;
	targetGroup: Group = $state()!;

	constructor(nodeData: NodeData, connectionData: ById<ConnectionData>) {
		super(nodeData, connectionData);
		const { targetGroupId } = nodeData.extras;
		if (typeof targetGroupId !== 'string') {
			throw new Error('Invalid type for targetGroupId. Received: ' + targetGroupId);
		}
		this.targetGroupId = targetGroupId;
	}

	updateGroup(groups: ById<Group>) {
		this.targetGroup = groups.get(this.targetGroupId);
		this.updateInputs();
	}

	// Uses a different name to prevent if from being called in super
	updateInputs() {
		this.inputs = [];
		const inputNodes = this.targetGroup.nodes.filter((node) => {
			return node.type === 'InputNode';
		});
		inputNodes.forEach((inputNode) => {
			const name = inputNode.extras.name as string;
			if (this.inputs.some((input) => input.name === name)) return;
			const input = new Input(name, this);
			this.inputs.push(input);
		});
	}
}
