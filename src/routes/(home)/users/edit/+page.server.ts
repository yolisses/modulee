import { UserModel } from '$lib/user/UserModel';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
