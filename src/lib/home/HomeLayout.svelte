<script lang="ts">
	import HomeNavbar from '$lib/home/HomeNavbar.svelte';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	let { children } = $props();

	const baseRouteContext = getBaseRouteContext();
	baseRouteContext.baseRoute = '';
</script>

<div class="flex h-screen flex-col overflow-hidden md:flex-row">
	<div class="flex flex-1 flex-col overflow-hidden md:order-2">
		{@render children()}
	</div>
	<HomeNavbar />
</div>
