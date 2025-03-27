import { getExternalModulesData } from '$lib/db/externalModule/getExternalModulesData';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const externalModulesData = await getExternalModulesData();
	console.log('from load', externalModulesData);
	return { externalModulesData };
};
