<script lang="ts">
	import { goto } from '$app/navigation';
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
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id="725523345294-l7ljv04v2maac7k6ugu6ifmuut88gbjk.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-callback="onGoogleSignIn"
	data-close_on_tap_outside="false"
	data-itp_support="true"
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
