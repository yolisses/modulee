import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		const user = await prisma.user.findUnique({ where: { id: locals.session.userId } });
		if (user && !user.isGuest) {
			redirect(307, '/');
		}
	}
};
