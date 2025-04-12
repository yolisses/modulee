import { error } from '@sveltejs/kit';

export function getSession(locals: App.Locals) {
	if (!locals.session) {
		error(403, 'Requires sign in');
	}
	return locals.session;
}
