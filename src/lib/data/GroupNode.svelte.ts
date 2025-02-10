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
	}

	// It's called in Editor
	//
	// Uses a different name to prevent if from being called in super
	customCalculateInputs() {
		const inputNodes = this.targetGroup.nodes.filter((node) => node.type === 'InputNode');

		return inputNodes.map((inputNode) => {
			const name = inputNode.extras.name as string;
			return new Input(name, this);
		});
	}
}
