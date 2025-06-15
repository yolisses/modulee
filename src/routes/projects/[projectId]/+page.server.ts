import { getRecord } from '$lib/global/getRecord';
import { patchProject } from '$lib/project/patchProject';
import { getSession } from '$lib/user/getSession';
import { type Actions } from '@sveltejs/kit';
import z from 'zod/v4';

export const actions = {
	patch: async ({ locals, request, params }) => {
		const { userId } = getSession(locals);
		const data = await getRecord(request.formData());
		const id = z.string().parse(params.projectId);
		await patchProject({ data, userId, id });
	},
} satisfies Actions;
