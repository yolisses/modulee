import prisma from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = locals;
	if (!session) {
		error(401, 'User not logged in');
	}

	const userData = await prisma.user.findUnique({ where: { id: session.userId } });
	if (!userData) {
		error(404, 'User not found');
	}
	return { userData };
};

export const actions = {
	default: async ({ locals, request }) => {
		const { session } = locals;
		if (!session) {
			error(401, 'User not logged in');
		}
		const { userId } = session;

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
