import { goto } from '$app/navigation';
import type { UserDataContext } from '$lib/user/userDataContext';
import cookies from 'js-cookie';
import { SESSION_COOKIE_NAME } from './SESSION_COOKIE_NAME';

export async function handleSignInResponse(code: string, userDataContext: UserDataContext) {
	const response = await fetch('/api/signIn', {
		method: 'POST',
		body: JSON.stringify({ code }),
		headers: { 'content-type': 'application/json' },
	});
	const data = await response.json();
	if (response.ok) {
		userDataContext.userData = data;
		goto('/users/' + data.id);

		const authToken = cookies.get(SESSION_COOKIE_NAME);
		if (authToken) {
			window.__JUCE__?.backend.emitEvent('setAuthToken', { authToken });
		}
	} else {
		throw new Error(data);
	}
}
