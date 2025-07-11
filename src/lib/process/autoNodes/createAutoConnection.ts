import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { InputPath } from '$lib/input/InputPath';
import { getAutoConnectionId } from './getAutoConnectionId';

export function createAutoConnection(inputPath: InputPath, targetNodeId: string): ConnectionData {
	return {
		id: getAutoConnectionId(inputPath),
		inputPath,
		targetNodeId,
	};
}
