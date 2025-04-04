import { deleteSessionTokenCookie } from '$lib/session/deleteSessionTokenCookie';
import { invalidateSession } from '$lib/session/invalidateSession';
import { validateSessionToken } from '$lib/session/validateSessionToken';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	const token = event.cookies.get('session');
	if (!token) {
		error(401, 'Session token not found');
	}

	const session = await validateSessionToken(token);
	if (!session) {
		error(404, 'Session not found');
	}

	invalidateSession(session.id, session.userId);
	deleteSessionTokenCookie(event);
	redirect(302, '/signIn');
};
