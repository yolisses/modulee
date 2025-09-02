import type { InputDefinition } from './InputDefinition';

export type NodeDefinition = {
	type: string;
	category: string;
	inputs: InputDefinition[];
	// TODO find a better name. Something like onlyUsedInPreProcessing but
	// shorter
	isIntermediary?: boolean;
	defaultExtras: Record<string, number | string>;
};
