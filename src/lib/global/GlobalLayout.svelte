<script lang="ts">
	import { page } from '$app/state';
	import { setCopyDataContext } from '$lib/graph/copy/copyDataContext';
	import { setLikedExternalModulesContext } from '$lib/module/externalModule/likedExternalModulesContext';
	import { handleSignInResponse } from '$lib/session/handleSignInResponse';
	import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
	import ModalRootLayout from '$lib/ui/ModalRootLayout.svelte';
	import type { UserData } from '$lib/user/UserData';
	import { setUserDataContext } from '$lib/user/userDataContext';
	import cookies from 'js-cookie';
	import { onMount, type Snippet } from 'svelte';
	import '../../app.css';
	import '../../inputTypeRange.css';

	interface Props {
		children: Snippet;
		userData: UserData;
	}

	const { children, userData }: Props = $props();

	const userDataContext = $state({ userData });
	setUserDataContext(userDataContext);

	$effect(() => {
		const url = new URL(page.url);
		const path = url.pathname;
		window.__JUCE__?.backend.emitEvent('setPath', { path });
	});

	// TODO check if it makes sense to not have a state here
	setCopyDataContext({ offset: 0 });

	let likedExternalModulesContext = $state({ likedExternalModules: new Set<string>() });
	setLikedExternalModulesContext(likedExternalModulesContext);

	onMount(async () => {
		const res = await fetch(`/api/likes`);
		if (res.ok) {
			const data = await res.json();
			likedExternalModulesContext.likedExternalModules = new Set(data);
		}
	});

	onMount(() => {
		window.__JUCE__?.backend.addEventListener('signInResponse', (code: string) =>
			handleSignInResponse(code, userDataContext),
		);
	});

	// this solution is suboptimal, since it may require refreshing the page
	onMount(() => {
		const authToken = cookies.get(SESSION_COOKIE_NAME);
		console.log('token from global layout', cookies.get(SESSION_COOKIE_NAME));
		if (authToken) {
			window.__JUCE__?.backend.emitEvent('setAuthToken', { authToken });
		}
	});
</script>

<ModalRootLayout>
	{@render children()}
</ModalRootLayout>
