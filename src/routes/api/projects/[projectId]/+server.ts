import { patchProject } from '$lib/project/patchProject';
import { getSession } from '$lib/user/getSession';
import { type RequestHandler, json } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	const { userId } = getSession(locals);

	if (!params.projectId) {
		throw new Error('Missing projectId');
	}

	const updatedProject = await patchProject({
		userId,
		id: params.projectId,
		data: await request.json(),
	});

	if (!updatedProject) {
		return new Response('Not found', { status: 404 });
	}

	return json(updatedProject);
};
