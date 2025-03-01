import type { InputPath } from './InputPath';

export function getAreInputPathsEqual(inputPath1: InputPath, inputPath2: InputPath) {
	return inputPath1.nodeId === inputPath2.nodeId && inputPath1.inputKey === inputPath2.inputKey;
}
