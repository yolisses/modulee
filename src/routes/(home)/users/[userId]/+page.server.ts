import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const userData = await prisma.user.findUnique({ where: { id: params.userId } });
	if (!userData) {
		error(404, 'User not found');
	}
	return { userData };
};
