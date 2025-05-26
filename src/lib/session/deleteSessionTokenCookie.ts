import type { Cookies } from '@sveltejs/kit';

export function deleteSessionTokenCookie(cookies: Cookies): void {
	cookies.set('session', '', { httpOnly: true, sameSite: 'lax', maxAge: 0, path: '/' });
}
