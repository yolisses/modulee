import { getExternalModuleData } from '$lib/db/externalModule/getExternalModuleData';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const externalModuleData = await getExternalModuleData(params.externalModuleId);
	return { externalModuleData };
};
