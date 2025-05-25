import { patchProject } from '$lib/project/patchProject';
import { getSession } from '$lib/user/getSession';
import { type Actions } from '@sveltejs/kit';
import { getStringOrUndefined } from './getStringOrUndefined';

export const actions = {
	patch: async ({ locals, request, params }) => {
		const { userId } = getSession(locals);

		const data = await request.formData();
		const name = getStringOrUndefined(data, 'name');
		const moduleType = getStringOrUndefined(data, 'moduleType');
		const description = getStringOrUndefined(data, 'description');

		const projectData = { name, moduleType, description };
		await patchProject({
			userId,
			data: projectData,
			id: params.projectId,
		});
	},
} satisfies Actions;
