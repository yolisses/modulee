import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import type { InputPath } from '$lib/input/InputPath';
import { getInternalModuleFallbackNodeId } from './getInternalModuleFallbackNodeId';

export function createInputFallbackConnection(
	inputPath: InputPath,
	nodeData: NodeData,
): ConnectionData {
	return {
		inputPath,
		id: createId(),
		targetNodeId: getInternalModuleFallbackNodeId(nodeData.internalModuleId),
	};
}
