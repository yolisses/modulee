<script lang="ts">
	import HomeSidebar from '$lib/home/HomeSidebar.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-row">
	<HomeSidebar />
	<div class="flex-1">
		{@render children()}
	</div>
</div>
