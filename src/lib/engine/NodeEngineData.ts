export type NodeEngineData = {
	id: number;
	type: string;
	extras: Record<string, number>;
	input_ids: Record<string, number | undefined>;
};
