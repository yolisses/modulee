import type { VectorData } from '$lib/space/VectorData';
import type { InputData } from './input/InputData';

export type NodeData = {
	id: string;
	size: VectorData;
	position: VectorData;
	inputs: InputData[];
};
