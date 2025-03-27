import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { ExternalModuleModel } from './ExternalModuleModel';

export async function getExternalModulesData(): Promise<ExternalModuleData[]> {
	return (await ExternalModuleModel.find({})).map((r) => r.toObject());
}
