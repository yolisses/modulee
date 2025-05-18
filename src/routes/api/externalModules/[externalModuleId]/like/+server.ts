import prisma from '$lib/prisma';
import { getSession } from '$lib/user/getSession';
import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, params }) => {
	const { userId } = getSession(locals);
	const { externalModuleId } = params;

	if (!userId) {
		error(401, 'Unauthorized');
	}

	if (!externalModuleId) {
		error(400, 'Missing externalModuleId');
	}

	const like = await prisma.like.create({ data: { userId, externalModuleId } });
	return new Response(JSON.stringify(like), { status: 201 });
};
