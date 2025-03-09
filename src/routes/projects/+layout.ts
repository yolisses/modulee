import { getModulesRepository } from '$lib/module/getModulesRepository';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const modulesRepository = getModulesRepository();
	await modulesRepository.initialize();
};
