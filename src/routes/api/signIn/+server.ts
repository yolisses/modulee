import { UserModel } from '$lib/account/UserModel';
import { verifyGoogleCredential } from '$lib/account/verifyGoogleCredential';
import { createSession } from '$lib/session/createSession';
import { generateSessionToken } from '$lib/session/generateSessionToken';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	const { request } = event;
	const { credential } = await request.json();

	const payload = await verifyGoogleCredential(credential);
	const { name, email } = payload;
	if (!email) {
		throw new Error('Missing email');
	}
	if (!name) {
		throw new Error('Missing name');
	}

	const userDocument = await UserModel.findOne({ email }).exec();
	if (userDocument) {
		const userData = userDocument.toObject();

		const token = generateSessionToken();
		const session = await createSession(token, userData.id);

		setSessionTokenCookie(event, token, session.expiresAt);
		return json(userData);
	}

	return json({});
};
