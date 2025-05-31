import type { Cookies } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from './SESSION_COOKIE_NAME';

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
	cookies.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/',
	});
}
