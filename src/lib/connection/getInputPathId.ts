import type { InputPath } from '$lib/input/InputPath';

export function getInputPathId(inputPath: InputPath) {
	return inputPath.nodeId + '/' + inputPath.inputKey;
}
