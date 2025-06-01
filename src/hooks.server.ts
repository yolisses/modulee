import { deleteSessionTokenCookie } from '$lib/session/deleteSessionTokenCookie';
import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { validateSessionToken } from '$lib/session/validateSessionToken';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals, route } = event;

	console.log('the route', route);
	if (route.id === '/dev') {
		return resolve(event);
	}

	const token = cookies.get(SESSION_COOKIE_NAME) ?? null;
	if (token === null) {
		locals.session = null;
		return resolve(event);
	}

	const session = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(cookies, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(cookies);
	}

	locals.session = session;
	return resolve(event);
};
