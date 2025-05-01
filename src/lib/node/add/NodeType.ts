export type NodeType = {
	name: string;
	category: string;
	inputNames: string[];
	defaultExtras: Record<string, number | string>;
};
