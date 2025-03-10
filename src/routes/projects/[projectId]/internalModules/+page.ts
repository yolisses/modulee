import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();
	const { projectData } = data;
	return redirect(
		307,
		`/projects/${projectData.id}/internalModules/${projectData.graphData.mainInternalModuleId}`,
	);
};
