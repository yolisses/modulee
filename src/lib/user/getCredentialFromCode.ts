import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';
import { OAuth2Client } from 'google-auth-library';

export async function verifyGoogleCredential(credential: string) {
	const oAuth2Client = new OAuth2Client();
	const loginTicket = await oAuth2Client.verifyIdToken({
		idToken: credential,
		audience: PUBLIC_AUTH_GOOGLE_ID,
	});

	const payload = loginTicket.getPayload();
	if (!payload) throw new Error('Missing payload');
	return payload;
}
