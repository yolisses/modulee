import { getSession } from '$lib/user/getSession';
import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, params }) => {
	const { userId } = getSession(locals);
	const { externalModuleId } = params;
	return json({ userId, externalModuleId });
};
