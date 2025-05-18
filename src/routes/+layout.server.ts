import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { userId } = locals.session || {};

	if (userId) {
		const userData = await prisma.user.findUnique({ where: { id: userId } });
		return { userData };
	} else {
		return { userData: null };
	}
};
