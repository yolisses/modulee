import prisma from '$lib/prisma';
import { getSession } from '$lib/user/getSession';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const { userId } = getSession(locals);
	const likes = await prisma.like.findMany({
		select: { externalModuleId: true },
		where: { user: { id: userId } },
	});
	const likedExternalModuleIds = likes.map((like) => {
		return like.externalModuleId;
	});
	return json(likedExternalModuleIds, { status: 200 });
};
