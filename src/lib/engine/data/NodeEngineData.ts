type ModuleNodeExtrasEngineData = {
	target_module_id?: number;
	input_target_ids: Map<number, number>;
};
type CommonNodeExtrasEngineData = Record<string, number>;
export type NodeExtrasEngineData = CommonNodeExtrasEngineData | ModuleNodeExtrasEngineData;

export type NodeEngineData = {
	id: number;
	type: string;
	extras: NodeExtrasEngineData;
	input_ids: Record<string, number>;
};
