import { UserModel } from '$lib/user/UserModel';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = locals;
	if (!session) {
		error(401, 'User not logged in');
	}

	const userData = (await UserModel.findById(session.userId))?.toObject();
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

		const formData = await request.formData();
		// TODO find a cleaner way to prevent other fields from being updated
		const { name, bio } = Object.fromEntries(formData);
		const userData = { name, bio };

		const user = await UserModel.findByIdAndUpdate(session.userId, userData, {
			runValidators: true,
		});

		if (!user) {
			error(404, 'User not found');
		}
	},
} satisfies Actions;
