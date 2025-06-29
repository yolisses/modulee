import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getAreInputPathsEqual } from '$lib/input/getAreInputPathsEqual';
import type { InputPath } from '$lib/input/InputPath';

export function getIsInputConnected(inputPath: InputPath, graphRegistry: GraphRegistry) {
	return graphRegistry.connections.values().some((connectionData) => {
		return getAreInputPathsEqual(inputPath, connectionData.inputPath);
	});
}
