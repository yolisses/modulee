import { connectToDatabase } from '$lib/db/connectToDatabase';
import { deleteSessionTokenCookie } from '$lib/session/deleteSessionTokenCookie';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { validateSessionToken } from '$lib/session/validateSessionToken';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	await connectToDatabase();
	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		event.locals.session = null;
		return resolve(event);
	}

	const session = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	return resolve(event);
};
