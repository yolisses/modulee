import type { NodeData } from '$lib/node/data/NodeData';
import { getInternalModuleFallbackNodeId } from './getInternalModuleFallbackNodeId';

export function createFallbackNode(internalModuleId: string): NodeData {
	return {
		internalModuleId,
		type: 'ConstantNode',
		extras: { value: 0 },
		position: { x: 0, y: 0 },
		unconnectedInputValues: {},
		isInputAutoConnectedMap: {},
		id: getInternalModuleFallbackNodeId(internalModuleId),
	};
}
