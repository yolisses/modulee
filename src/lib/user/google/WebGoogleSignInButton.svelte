<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';
	import { onMount } from 'svelte';

	interface Props {
		loading: boolean;
	}

	const userDataContext = getRequiredContext(userDataContextKey);
	let { loading = $bindable() }: Props = $props();

	async function onGoogleSignIn({ credential }: { credential: string }) {
		loading = true;
		try {
			const response = await fetch('/api/signIn', {
				method: 'POST',
				body: JSON.stringify({ credential }),
				headers: { 'content-type': 'application/json' },
			});
			const data = await response.json();
			if (response.ok) {
				userDataContext.userData = data;
				goto('/users/' + data.id);
			} else {
				throw new Error(data);
			}
		} catch (e) {}
		loading = false;
	}

	onMount(() => {
		window.onGoogleSignIn = onGoogleSignIn;
	});
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-ux_mode="popup"
	data-context="signin"
	data-itp_support="true"
	data-auto_prompt="false"
	data-callback="onGoogleSignIn"
	data-close_on_tap_outside="false"
	data-client_id={PUBLIC_AUTH_GOOGLE_ID}
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
