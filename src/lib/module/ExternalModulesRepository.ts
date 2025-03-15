import type { ExternalModuleData } from './ExternalModuleData';

export interface ExternalModulesRepository {
	initialize(): Promise<void>;
	// TODO add external modules ids parameter
	getExternalModules(): Promise<ExternalModuleData[]>;
	addExternalModule(externalModuleData: ExternalModuleData): Promise<void>;
}
