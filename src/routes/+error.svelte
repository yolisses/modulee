<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let href = '/';

	onMount(() => {
		try {
			// Send the user to last page in the app or to home page.
			if (!document.referrer) return;
			const url = new URL(document.referrer);
			if (url.origin !== location.origin) {
				href = document.referrer;
			}
		} catch (e) {
			console.error(e);
		}
	});
</script>

<div class="flex min-h-screen flex-1 flex-col items-center justify-center gap-4 p-8">
	<div class="text-xl">{page.error?.message}</div>
	<div>{page.status}</div>
	<a {href} class="primary-button">Go back</a>
</div>
