import { error } from '@sveltejs/kit';

export function getSession(locals: App.Locals) {
	if (!locals.session) {
		error(401, 'User not logged in');
	}
	return locals.session;
}
