import { findById } from '$lib/array/findById';
import type { Group } from '$lib/data/Group.svelte';
import type { Node } from '$lib/data/Node.svelte';

export function getNodeEngineDataType(node: Node, groups: Group[]) {
	if (node.type === 'GroupNode') {
		const group = findById(groups, node.groupId);
		if (group.type === 'voice') {
			return 'GroupVoicesNode';
		}
	}
	return node.type;
}
