import type { ExternalModuleData } from './ExternalModuleData';

export interface ExternalModulesRepository {
	initialize(): Promise<void>;
	getExternalModules(): Promise<ExternalModuleData[]>;
	addExternalModule(externalModuleData: ExternalModuleData): Promise<void>;
}
