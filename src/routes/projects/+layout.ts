import { getExternalModulesRepository } from '$lib/module/externalModule/getExternalModulesRepository';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const modulesRepository = getExternalModulesRepository();
	await modulesRepository.initialize();
};
