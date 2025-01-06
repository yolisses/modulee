export type NodeEngineData = {
	id: number;
	type: string;
	extras?: Record<string, unknown>;
	input_ids?: Record<string, number>;
};
