<script lang="ts">
	import HomeNavbar from '$lib/home/HomeNavbar.svelte';
	let { children } = $props();
</script>

<div class="flex max-h-screen flex-row overflow-hidden">
	<HomeNavbar />
	<div class="flex-1">
		{@render children()}
	</div>
</div>
