import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../externalModules/$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		redirect(307, '/signIn');
	}
};
