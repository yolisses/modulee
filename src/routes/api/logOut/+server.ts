import { deleteSessionTokenCookie } from '$lib/session/deleteSessionTokenCookie';
import { invalidateSession } from '$lib/session/invalidateSession';
import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
import { validateSessionToken } from '$lib/session/validateSessionToken';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	const token = cookies.get(SESSION_COOKIE_NAME);
	if (!token) {
		error(401, 'Session token not found');
	}

	const session = await validateSessionToken(token);
	if (!session) {
		error(404, 'Session not found');
	}

	invalidateSession(session.id, session.userId);
	deleteSessionTokenCookie(cookies);
	redirect(302, '/signIn');
};
