import { createProject } from '$lib/project/create/createProject';
import { getProjectFriendlyPath } from '$lib/project/getProjectFriendlyPath';
import { getSession } from '$lib/user/getSession';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { userId } = getSession(locals);
	const projectData = await createProject({
		moduleType: 'instrument',
		name: 'Untitled project',
		userId,
	});
	redirect(303, getProjectFriendlyPath(projectData));
};
