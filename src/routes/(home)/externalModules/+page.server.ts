import { getExternalModulesData } from '$lib/db/externalModule/getExternalModulesData';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const externalModulesData = await getExternalModulesData();
	return { externalModulesData, test: 1 };
};

export const actions: Actions = {
	create({}) {},
};
