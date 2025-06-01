<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { mockJuceInitialData } from '$lib/dev/mockJuceInitialData';
	import { setCopyDataContext } from '$lib/graph/copy/copyDataContext';
	import { setLikedExternalModulesContext } from '$lib/module/externalModule/likedExternalModulesContext';
	import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
	import { setModalRootContext, type ModalRootContext } from '$lib/ui/modalRootContext';
	import type { UserData } from '$lib/user/UserData';
	import { setUserDataContext } from '$lib/user/userDataContext';
	import cookies from 'js-cookie';
	import { onMount, type Snippet } from 'svelte';

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

	const modalRootContext = $state({} as ModalRootContext);
	setModalRootContext(modalRootContext);

	let likedExternalModulesContext = $state({ likedExternalModules: new Set<string>() });
	setLikedExternalModulesContext(likedExternalModulesContext);

	onMount(async () => {
		const res = await fetch(`/api/likes`);
		if (res.ok) {
			const data = await res.json();
			likedExternalModulesContext.likedExternalModules = new Set(data);
		}
	});

	async function handleSignInResponse(code: string) {
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

	onMount(() => {
		mockJuceInitialData();
	});

	onMount(() => {
		const authToken = window.__JUCE__?.initialisationData.authToken[0];
		if (authToken) {
			cookies.set(SESSION_COOKIE_NAME, authToken);
		}
	});

	onMount(() => {
		window.__JUCE__?.backend.addEventListener('signInResponse', handleSignInResponse);
	});
</script>

<div class="contents" bind:this={modalRootContext.modalRoot}>
	{@render children()}
</div>
