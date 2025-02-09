import type { ExtrasData } from './ExtrasData';
import type { VectorData } from './VectorData';

// TODO implement single output
export type NodeData = {
	id: string;
	type: string;
	groupId: string;
	extras: ExtrasData;
	position: VectorData;
};
