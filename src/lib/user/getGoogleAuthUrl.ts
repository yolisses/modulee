import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';

const GOOGLE_REDIRECT_URI = 'http://localhost:39057/signIn';
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
