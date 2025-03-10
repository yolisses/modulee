import type { InternalModuleEngineData } from './InternalModuleEngineData';

// TODO add mainInternalModuleId
export type GraphEngineData = {
	main_internalModule_id?: number;
	internalModules: InternalModuleEngineData[];
};
