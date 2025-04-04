import { UserModel } from '$lib/user/UserModel';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const userData = (await UserModel.findById(params.userId))?.toObject();
	if (!userData) {
		error(404, 'User not found');
	}
	return { userData };
};
