type InternalModuleNodeExtrasEngineData = {
	target_internalModule_id?: number;
	input_target_ids: Map<number, number>;
};
type CommonNodeExtrasEngineData = Record<string, number>;
export type NodeExtrasEngineData = CommonNodeExtrasEngineData | InternalModuleNodeExtrasEngineData;

export type NodeEngineData = {
	id: number;
	type: string;
	extras: NodeExtrasEngineData;
	input_ids: Record<string, number>;
};
