import { deleteProject } from '$lib/project/deleteProject';
import { getSession } from '$lib/user/getSession';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	delete: async ({ locals, params }) => {
		const { userId } = getSession(locals);

		if (!params.projectId) {
			throw new Error('Missing projectId');
		}

		await deleteProject({ userId, id: params.projectId });
	},
} satisfies Actions;
