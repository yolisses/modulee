import type { InputData } from './InputData.js';
import type { OutputData } from './OutputData.js';
import type { VectorData } from './VectorData.js';

export type NodeData = {
	id: string;
	type: string;
	inputs: InputData[];
	position: VectorData;
	outputs: OutputData[];
	extras: Record<string, number>;
};
