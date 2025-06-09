<script lang="ts">
	import HomeNavbar from '$lib/home/HomeNavbar.svelte';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	let { children } = $props();

	const baseRouteContext = getBaseRouteContext();
	baseRouteContext.baseRoute = '';
</script>

<div class="flex max-h-screen flex-row overflow-hidden">
	<HomeNavbar />
	<div class="flex-1">
		{@render children()}
	</div>
</div>
