import type { VectorData } from '$lib/space/VectorData';
import type { InputData } from './input/InputData';
import type { OutputData } from './output/OutputData';

export type NodeData = {
	id: string;
	size: VectorData;
	position: VectorData;
	inputs: InputData[];
	outputs: OutputData[];
};
