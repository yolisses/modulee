import prisma from '$lib/prisma';
import { getSession } from '$lib/user/getSession';
import { error, json, type RequestHandler } from '@sveltejs/kit';

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
	return json(like, { status: 201 });
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	const { userId } = getSession(locals);
	const { externalModuleId } = params;

	if (!userId) {
		throw error(401, 'Unauthorized');
	}

	if (!externalModuleId) {
		throw error(400, 'Missing externalModuleId');
	}

	const deleted = await prisma.like.deleteMany({
		where: { userId, externalModuleId },
	});

	return json({ deleted: deleted.count }, { status: 200 });
};
