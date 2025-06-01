import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from './SESSION_COOKIE_NAME';

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
	// TODO find a way to set httpOnly true when not using JUCE.
	cookies.set(SESSION_COOKIE_NAME, token, {
		path: '/',
		sameSite: 'lax',
		httpOnly: false,
		priority: 'high',
		expires: expiresAt,
		secure: env.NODE_ENV !== 'development',
	});
}
