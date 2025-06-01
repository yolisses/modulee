import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	console.log(
		'cookie from load dev page',
		cookies.getAll(),
		cookies.get(SESSION_COOKIE_NAME),
		cookies.get('session'),
	);
};
