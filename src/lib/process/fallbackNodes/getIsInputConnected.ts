import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphData } from '$lib/data/GraphData';
import type { InputPath } from '$lib/data/InputPath';

export function getIsInputConnected(inputPath: InputPath, graphData: GraphData) {
	return graphData.connections.values().some((connectionData) => {
		return getAreInputPathsEqual(inputPath, connectionData.inputPath);
	});
}
