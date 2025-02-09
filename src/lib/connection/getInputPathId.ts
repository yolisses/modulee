import type { InputPath } from '$lib/data/InputPath';

export function getInputPathId(inputPath: InputPath) {
	return inputPath.nodeId + '/' + inputPath.nodeId;
}
