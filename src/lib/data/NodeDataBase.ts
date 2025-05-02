import type { VectorData } from './VectorData';

// TODO implement single output
export type NodeDataBase<
	T extends string = string,
	E = object,
	U extends Record<string, number> = Record<string, number>,
> = {
	type: T;
	extras: E;
	id: string;
	position: VectorData;
	internalModuleId: string;
	unconnectedInputValues: U;
};
