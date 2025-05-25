import { getProjects } from '$lib/project/getProjects';
import { getSession } from '$lib/user/getSession';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { userId } = getSession(locals);

	const projects = await getProjects(userId);
	return { projects };
};
