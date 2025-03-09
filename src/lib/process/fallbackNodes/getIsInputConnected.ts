import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';

export function getIsInputConnected(inputPath: InputPath, graphRegistry: GraphRegistry) {
	return graphRegistry.connections.values().some((connectionData) => {
		return getAreInputPathsEqual(inputPath, connectionData.inputPath);
	});
}
