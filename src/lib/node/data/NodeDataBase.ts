import type { VectorData } from '../actionCommands/VectorData';

export type NodeDataBase<T extends string = string, E = object> = {
	type: T;
	extras: E;
	id: string;
	position: VectorData;
	internalModuleId: string;
	unconnectedInputValues: Record<string, number>;
	isInputAutoConnectedMap: Record<string, boolean>;
};

// TODO find a better name for isInputAutoConnectedMap
