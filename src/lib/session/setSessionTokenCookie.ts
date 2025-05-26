import type { Cookies } from '@sveltejs/kit';

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
	cookies.set('session', token, { httpOnly: true, sameSite: 'lax', expires: expiresAt, path: '/' });
}
