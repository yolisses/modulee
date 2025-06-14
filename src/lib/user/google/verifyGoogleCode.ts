import { GOOGLE_SECRET } from '$env/static/private';
import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_REDIRECT_URI } from './GOOGLE_REDIRECT_URI';

export async function getCredentialFromCode(code: string) {
	const oAuth2Client = new OAuth2Client(PUBLIC_AUTH_GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT_URI);

	const { tokens } = await oAuth2Client.getToken(code);

	oAuth2Client.setCredentials(tokens);

	if (!tokens.id_token) {
		throw new Error('Missing id_token');
	}

	return tokens.id_token;
}
