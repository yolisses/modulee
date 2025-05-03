import type { InputDefinition } from './InputDefinition';

export type NodeType = {
	name: string;
	category: string;
	inputs: InputDefinition[];
	defaultExtras: Record<string, number | string>;
};
