export type NodeType = {
	id: string;
	name: string;
	inputNames: string[];
	outputNames: string[];
	defaultExtras: Record<string, number>;
};
