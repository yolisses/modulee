import prisma from '$lib/prisma';
import { getSession } from '$lib/user/getSession';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { userId } = getSession(locals);
	const userData = await prisma.user.findUnique({ where: { id: userId } });
	if (!userData) {
		error(404, 'User not found');
	}
	return { userData };
};

export const actions = {
	default: async ({ locals, request }) => {
		const { userId } = getSession(locals);

		const formData = await request.formData();
		// TODO find a cleaner way to prevent other fields from being updated
		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				bio: formData.get('bio') as string,
				name: formData.get('name') as string,
			},
		});

		if (!user) {
			error(404, 'User not found');
		}

		redirect(302, '/users/' + userId);
	},
} satisfies Actions;
