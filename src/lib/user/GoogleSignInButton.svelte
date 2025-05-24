<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';
	import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
	import { onMount } from 'svelte';
	import { getUserDataContext } from './userDataContext';

	interface Props {
		loading: boolean;
	}

	const userDataContext = getUserDataContext();
	let { loading = $bindable() }: Props = $props();

	async function onGoogleSignIn({ credential }: { credential: string }) {
		loading = true;
		try {
			const response = await fetch('/api/signIn', {
				method: 'POST',
				body: JSON.stringify({ credential }),
				headers: { 'content-type': 'application/json' },
			});
			const userData = await response.json();
			userDataContext.userData = userData;
			goto('/users/' + userData.id);
		} catch (e) {}
		loading = false;
	}

	onMount(() => {
		window.onGoogleSignIn = onGoogleSignIn;
	});

	const haveJuceSupport = getHaveJuceSupport();
	const loginUri = haveJuceSupport ? window.location.origin + '/signIn/response' : undefined;
	console.log(loginUri);
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-context="signin"
	data-itp_support="true"
	data-login_uri={loginUri}
	data-callback="onGoogleSignIn"
	data-close_on_tap_outside="false"
	data-client_id={PUBLIC_AUTH_GOOGLE_ID}
	data-ux_mode={haveJuceSupport ? 'redirect' : 'popup'}
	data-auto_prompt={haveJuceSupport ? 'false' : undefined}
></div>

<div class="flex h-10">
	<div
		class="g_id_signin"
		data-type="standard"
		data-shape="rectangular"
		data-theme="filled_blue"
		data-text="signin_with"
		data-size="large"
		data-logo_alignment="left"
	></div>
</div>
