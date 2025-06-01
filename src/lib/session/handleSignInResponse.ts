import { goto } from '$app/navigation';
import type { UserDataContext } from '$lib/user/userDataContext';

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
	} else {
		throw new Error(data);
	}
}
