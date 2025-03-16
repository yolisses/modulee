import type { ExternalModuleData } from './ExternalModuleData';

export interface ExternalModulesRepository {
	initialize(): Promise<void>;
	deleteExternalModule(id: string): void;
	getExternalModules(): Promise<ExternalModuleData[]>;
	getExternalModulesById(ids: string[]): Promise<ExternalModuleData[]>;
	addExternalModule(externalModuleData: ExternalModuleData): Promise<void>;
}
