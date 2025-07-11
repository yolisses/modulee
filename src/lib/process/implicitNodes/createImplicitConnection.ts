import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { InputPath } from '$lib/input/InputPath';
import { getImplicitConnectionId } from './getImplicitConnectionId';

export function createImplicitConnection(
	inputPath: InputPath,
	targetNodeId: string,
): ConnectionData {
	return {
		id: getImplicitConnectionId(inputPath),
		inputPath,
		targetNodeId,
	};
}
