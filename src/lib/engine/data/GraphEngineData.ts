import type { ModuleEngineData } from './ModuleEngineData';

// TODO add mainInternalModuleId
export type GraphEngineData = {
	main_module_id?: number;
	modules: ModuleEngineData[];
};
