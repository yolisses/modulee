import type { VectorData } from './VectorData';

// TODO implement single output
export type NodeDataBase<T extends string = string, E = unknown> = {
	type: T;
	extras: E;
	id: string;
	internalModuleId: string;
	position: VectorData;
};
