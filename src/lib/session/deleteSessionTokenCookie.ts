import type { Cookies } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from './SESSION_COOKIE_NAME';
import { env } from '$env/dynamic/private';

export function deleteSessionTokenCookie(cookies: Cookies): void {
	cookies.set(SESSION_COOKIE_NAME, '', {
		path: '/',
		maxAge: 0,
		sameSite: 'lax',
		httpOnly: false,
		priority: 'high',
		secure: env.NODE_ENV !== 'development',
	});
}
