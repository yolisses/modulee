import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { projectData } = await parent();
	const { mainInternalModuleId } = projectData.graph;
	const path = `/projects/${projectData.id}/internalModules/${mainInternalModuleId}/graph`;
	redirect(307, path);
};
