import { addLike } from '$lib/module/externalModule/addLike';
import { removeLike } from '$lib/module/externalModule/removeLike';
import { getSession } from '$lib/user/getSession';
import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, params }) => {
	const { userId } = getSession(locals);
	const { externalModuleId } = params;

	if (!externalModuleId) {
		error(400, 'Missing externalModuleId');
	}

	await addLike(userId, externalModuleId);
	return new Response(null, { status: 201 });
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	const { userId } = getSession(locals);
	const { externalModuleId } = params;

	if (!externalModuleId) {
		throw error(400, 'Missing externalModuleId');
	}

	await removeLike(userId, externalModuleId);
	return new Response(null, { status: 204 });
};
