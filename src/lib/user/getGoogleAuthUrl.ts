import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';
import { GOOGLE_REDIRECT_URI } from './GOOGLE_REDIRECT_URI';

const GOOGLE_SCOPE = [
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/userinfo.email',
].join(' ');

export function getGoogleAuthUrl(): string {
	const params = new URLSearchParams({
		client_id: PUBLIC_AUTH_GOOGLE_ID,
		redirect_uri: GOOGLE_REDIRECT_URI,
		response_type: 'code',
		scope: GOOGLE_SCOPE,
		access_type: 'offline',
	});

	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
