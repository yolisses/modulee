import type { NodeTypeInput } from './NodeTypeInput';

export type NodeType = {
	name: string;
	category: string;
	inputs: NodeTypeInput[];
	defaultExtras: Record<string, number | string>;
};
