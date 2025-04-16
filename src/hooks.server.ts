import { MONGODB_URI } from '$env/static/private';
import { deleteSessionTokenCookie } from '$lib/session/deleteSessionTokenCookie';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { validateSessionToken } from '$lib/session/validateSessionToken';
import type { Handle } from '@sveltejs/kit';
import { connect } from 'mongoose';

export const handle: Handle = async ({ event, resolve }) => {
	await connect(MONGODB_URI);

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
