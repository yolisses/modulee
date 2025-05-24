import { createSession } from '$lib/session/createSession';
import { generateSessionToken } from '$lib/session/generateSessionToken';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { signIn } from '$lib/user/signIn';
import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	// Get credential or code
	const { request } = event;
	const { credential, code } = await request.json();
	if (!code && !credential) {
		throw new Error('Missing code or credential');
	}

	// Get user data
	const userData = await signIn({ credential, code });

	// Set session
	const token = generateSessionToken();
	const session = await createSession(token, userData.id);
	setSessionTokenCookie(event, token, session.expiresAt);

	// Return user data
	return json(userData);
};
