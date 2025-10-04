import type { VectorData } from '../actionCommands/VectorData';

export type NodeDataBase<T extends string = string, E = object> = {
	extras: E;
	id: string;
	internalModuleId: string;
	isInputAutoConnectedMap: Record<string, boolean>;
	name?: string;
	position: VectorData;
	type: T;
	unconnectedInputValues: Record<string, number>;
};

// TODO rename NodeDataBase to BaseNodeData
// TODO find a better name for isInputAutoConnectedMap
