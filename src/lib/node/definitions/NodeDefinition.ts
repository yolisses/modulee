import type { InputDefinition } from './InputDefinition';

export type NodeDefinition = {
	name: string;
	category: string;
	inputs: InputDefinition[];
	defaultExtras: Record<string, number | string>;
};
