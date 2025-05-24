import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';
import { OAuth2Client } from 'google-auth-library';

export async function verifyGoogleCredential(credential: string) {
	const client = new OAuth2Client();
	const ticket = await client.verifyIdToken({
		idToken: credential,
		audience: PUBLIC_AUTH_GOOGLE_ID,
	});
	const payload = ticket.getPayload();
	if (!payload) throw new Error('Missing payload');
	return payload;
}
