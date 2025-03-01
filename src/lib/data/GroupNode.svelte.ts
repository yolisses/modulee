import type { ById } from '$lib/editor/ById';
import type { Group } from './Group.svelte';
import { Input } from './Input.svelte';
import { InputNode } from './InputNode.svelte';
import { Node } from './Node.svelte';
import type { GroupNodeData } from './variants/GroupNodeData';
import type { GroupNodeExtrasData } from './variants/GroupNodeExtrasData';
import type { GroupVoicesNodeData } from './variants/GroupVoicesNodeData';

// A group node should be created with a group, but a group should be created
// with node options. To solve this cyclic dependency, the GroupNode is created
// without group, and the have updateGroup called
export class GroupNode extends Node {
	targetGroupId?: string;
	targetGroup?: Group = $state()!;
	declare extras: GroupNodeExtrasData;

	constructor(nodeData: GroupNodeData | GroupVoicesNodeData) {
		super(nodeData);
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

	getInputNodes() {
		if (!this.targetGroup) return [];
		return this.targetGroup.nodes.filter((node) => {
			return node instanceof InputNode;
		});
	}

	// Uses a different name to prevent if from being called in super
	updateInputs() {
		this.inputs = [];
		const inputNodes = this.getInputNodes();
		inputNodes.forEach((inputNode) => {
			const input = new Input(inputNode.id, inputNode.extras.name, this);
			this.inputs.push(input);
		});
	}
}
