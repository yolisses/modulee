export function getGoogleAuthUrl() {
	const clientId = '725523345294-l7ljv04v2maac7k6ugu6ifmuut88gbjk.apps.googleusercontent.com';
	const redirectUri = 'http://localhost:5173/signIn/response';
	const scope =
		'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
	const authUrl =
		'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
		clientId +
		'&redirect_uri=' +
		redirectUri +
		'&response_type=code&scope=' +
		scope +
		'&access_type=offline';

	return authUrl;
}
