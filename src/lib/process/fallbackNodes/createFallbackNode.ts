import type { NodeData } from '$lib/data/NodeData';
import { getInternalModuleFallbackNodeId } from './getInternalModuleFallbackNodeId';

export function createFallbackNode(internalModuleId: string): NodeData {
	return {
		internalModuleId,
		type: 'ConstantNode',
		extras: { value: 0 },
		position: { x: 0, y: 0 },
		id: getInternalModuleFallbackNodeId(internalModuleId),
	};
}
