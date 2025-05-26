import { deleteSessionTokenCookie } from '$lib/session/deleteSessionTokenCookie';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { validateSessionToken } from '$lib/session/validateSessionToken';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const token = cookies.get('session') ?? null;
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
