import type { ModuleEngineData } from './ModuleEngineData';

// TODO add mainInternalModuleId
export type GraphEngineData = {
	main_internalModule_id?: number;
	modules: ModuleEngineData[];
};
