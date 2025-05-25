import { patchProject } from '$lib/project/patchProject';
import { getSession } from '$lib/user/getSession';
import { type Actions } from '@sveltejs/kit';

export const actions = {
	patch: async ({ locals, request, params }) => {
		const { userId } = getSession(locals);

		const data = await request.formData();
		const name = getStringOrUndefined(data, 'name');
		const moduleType = getStringOrUndefined(data, 'moduleType');
		const description = getStringOrUndefined(data, 'description');

		const projectData = { name, moduleType, description };
		console.log(projectData);
		await patchProject({ userId, id: params.projectId, data: projectData });
	},
} satisfies Actions;

function getStringOrUndefined(data: FormData, key: string): string | undefined {
	const value = data.get(key);
	if (value === null) return undefined;

	if (typeof value === 'string') {
		return value;
	}
}
