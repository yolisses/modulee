<script lang="ts">
	import HomeNavbar from '$lib/home/HomeNavbar.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-row">
	<HomeNavbar />
	<div class="flex-1">
		{@render children()}
	</div>
</div>
