import type { VectorData } from './VectorData';

// TODO implement single output
export type NodeDataBase<T extends string = string, E = object> = {
	type: T;
	extras: E;
	id: string;
	position: VectorData;
	internalModuleId: string;
	unconnectedInputValues: Record<string, number>;
};
