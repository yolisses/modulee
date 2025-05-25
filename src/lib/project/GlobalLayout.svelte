<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { setCopyDataContext } from '$lib/graph/copy/copyDataContext';
	import { setLikedExternalModulesContext } from '$lib/module/externalModule/likedExternalModulesContext';
	import { setModalRootContext, type ModalRootContext } from '$lib/ui/modalRootContext';
	import { getUserDataContext } from '$lib/user/userDataContext';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

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

	const userDataContext = getUserDataContext();

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
		window.__JUCE__?.backend.addEventListener('signInResponse', handleSignInResponse);
	});
</script>

<div class="contents" bind:this={modalRootContext.modalRoot}>
	{@render children()}
</div>
