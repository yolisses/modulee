import type { ExtrasData } from './ExtrasData';
import type { InputData } from './InputData';
import type { OutputData } from './OutputData';
import type { VectorData } from './VectorData';

export type NodeData = {
	id: string;
	type: string;
	groupId: string;
	extras: ExtrasData;
	inputs: InputData[];
	position: VectorData;
	outputs: OutputData[];
};
