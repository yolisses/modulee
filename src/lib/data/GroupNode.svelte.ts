import type { ById } from '$lib/editor/ById';
import type { ConnectionData } from './ConnectionData';
import type { Group } from './Group.svelte';
import { Input } from './Input.svelte';
import { InputNode } from './InputNode.svelte';
import { Node } from './Node.svelte';
import type { GroupNodeData } from './variants/GroupNodeData';
import type { GroupNodeExtrasData } from './variants/GroupNodeExtrasData';
import type { GroupVoicesNodeData } from './variants/GroupVoicesNodeData';

export class GroupNode extends Node {
	targetGroupId?: string;
	targetGroup?: Group = $state()!;
	declare extras: GroupNodeExtrasData;

	constructor(nodeData: GroupNodeData | GroupVoicesNodeData, connectionData: ById<ConnectionData>) {
		super(nodeData, connectionData);
		const { targetGroupId } = nodeData.extras;
		if (typeof targetGroupId === 'string' || typeof targetGroupId === 'undefined') {
			this.targetGroupId = targetGroupId;
		} else {
			throw new Error('Invalid type for targetGroupId. Received: ' + targetGroupId);
		}
	}

	updateGroup(groups: ById<Group>) {
		if (this.targetGroupId) {
			this.targetGroup = groups.get(this.targetGroupId);
		} else {
			this.targetGroup = undefined;
		}
		this.updateInputs();
	}

	// Uses a different name to prevent if from being called in super
	updateInputs() {
		this.inputs = [];
		if (!this.targetGroup) return;
		this.targetGroup.nodes.filter((node) => {
			if (!(node instanceof InputNode)) {
				return;
			}
			const name = node.extras.name;
			if (this.inputs.some((input) => input.name === name)) return;
			const input = new Input(name, this);
			this.inputs.push(input);
		});
	}
}
