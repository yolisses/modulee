import prisma from '$lib/prisma';
import type { UserData } from '$lib/user/UserData';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { userId } = locals.session || {};

	if (userId) {
		const data = await prisma.user.findUnique({ where: { id: userId } });
		const userData = data as UserData;
		return { userData };
	} else {
		return { userData: null };
	}
};
