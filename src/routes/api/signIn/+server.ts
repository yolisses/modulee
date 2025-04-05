import { createSession } from '$lib/session/createSession';
import { generateSessionToken } from '$lib/session/generateSessionToken';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import type { UserData } from '$lib/user/UserData';
import { UserModel } from '$lib/user/UserModel';
import { verifyGoogleCredential } from '$lib/user/verifyGoogleCredential';
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

	let userData: UserData;

	const existingUser = await UserModel.findOne({ email }).exec();
	if (existingUser) {
		userData = existingUser.toObject();
	} else {
		const newUser = new UserModel({ name, email });
		await newUser.save();
		userData = newUser.toObject();
	}

	const token = generateSessionToken();
	const session = await createSession(token, userData.id);

	setSessionTokenCookie(event, token, session.expiresAt);
	return json(userData);
};
