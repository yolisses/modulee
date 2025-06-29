import type { ConnectionData } from '$lib/connection/ConnectionData';
import { createId } from '$lib/global/createId';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeData } from '$lib/node/data/NodeData';
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
