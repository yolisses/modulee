import { getProjects } from '$lib/project/getProjects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await getProjects();
	return { projects };
};
