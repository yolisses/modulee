import type { InputDefinition } from './InputDefinition';

export type NodeDefinition = {
	type: string;
	category: string;
	inputs: InputDefinition[];
	defaultExtras: Record<string, number | string>;
};
