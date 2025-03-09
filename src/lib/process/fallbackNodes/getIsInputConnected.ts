import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';

export function getIsInputConnected(inputPath: InputPath, graphData: GraphRegistry) {
	return graphData.connections.values().some((connectionData) => {
		return getAreInputPathsEqual(inputPath, connectionData.inputPath);
	});
}
