<script lang="ts">
	import { goto } from '$app/navigation';
	import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
	import cookies from 'js-cookie';
	import { onMount } from 'svelte';

	// this solution is suboptimal, since it may require refreshing the page
	onMount(() => {
		console.log('token from dev page', cookies.get(SESSION_COOKIE_NAME), cookies.get('session'));
		goto('/');
	});
</script>

<div>Hello, dev</div>
