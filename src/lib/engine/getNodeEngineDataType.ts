import { findById } from '$lib/array/findById';
import type { Group } from '$lib/data/Group.svelte';
import { GroupNode } from '$lib/data/GroupNode.svelte';
import type { Node } from '$lib/data/Node.svelte';

export function getNodeEngineDataType(node: Node, groups: Group[]) {
	if (node instanceof GroupNode) {
		if (!node.targetGroupId) {
			throw new Error('Not implemented for undefined target group id');
		}
		const group = findById(groups, node.targetGroupId);
		if (group.type === 'voice') {
			return 'GroupVoicesNode';
		}
	}
	return node.type;
}
