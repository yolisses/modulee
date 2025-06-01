<script lang="ts">
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
	import Spinner from '$lib/ui/Spinner.svelte';
	import cookies from 'js-cookie';
	import { onMount } from 'svelte';

	// this solution is suboptimal, since it may require refreshing the page
	onMount(() => {
		const authToken = window.__JUCE__?.initialisationData.authToken?.[0];
		if (!authToken) {
			throw new Error('Missing auth token initialization data');
		}
		cookies.set(SESSION_COOKIE_NAME, authToken, {
			path: '/',
			secure: !dev,
			sameSite: 'lax',
			httpOnly: false,
			priority: 'high',
		});
		goto('/');
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<Spinner />
</div>
