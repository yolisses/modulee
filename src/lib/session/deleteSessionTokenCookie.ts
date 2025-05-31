import type { Cookies } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from './SESSION_COOKIE_NAME';

export function deleteSessionTokenCookie(cookies: Cookies): void {
	cookies.set(SESSION_COOKIE_NAME, '', { httpOnly: true, sameSite: 'lax', maxAge: 0, path: '/' });
}
