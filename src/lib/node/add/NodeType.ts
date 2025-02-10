export type NodeType = {
	id: string;
	name: string;
	inputNames: string[];
	defaultExtras: Record<string, number | string>;
};
