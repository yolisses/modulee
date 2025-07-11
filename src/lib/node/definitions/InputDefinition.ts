import type { AutoConnectionDefinition } from './AutoConnectionDefinition';

export type InputDefinition = {
	min: number;
	max: number;
	key: string;
	default: number;
	isBoolean: boolean;
	autoConnection?: AutoConnectionDefinition;
};

// TODO find a better name for autoConnectedByDefault
