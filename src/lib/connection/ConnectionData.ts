import type { InputPath } from '$lib/input/InputPath';

export type ConnectionData = {
	id: string;
	inputPath: InputPath;
	targetNodeId: string;
};
