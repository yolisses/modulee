import type { NodeData } from '$lib/data/NodeData';
import { getGroupFallbackNodeId } from './getGroupFallbackNodeId';

export function createFallbackNode(groupId: string): NodeData {
	return {
		groupId,
		type: 'ConstantNode',
		extras: { value: 0 },
		position: { x: 0, y: 0 },
		id: getGroupFallbackNodeId(groupId),
	};
}
