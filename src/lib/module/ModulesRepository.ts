import type { ModuleData } from './ModuleData';

export interface ModulesRepository {
	initialize(): Promise<void>;
	getModules(): Promise<ModuleData[]>;
	addModule(moduleData: ModuleData): Promise<void>;
}
