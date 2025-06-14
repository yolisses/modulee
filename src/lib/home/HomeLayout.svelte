<script lang="ts">
	import HomeNavbar from '$lib/home/HomeNavbar.svelte';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	let { children } = $props();

	const baseRouteContext = getBaseRouteContext();
	baseRouteContext.baseRoute = '';
</script>

<div class="flex max-h-screen flex-col-reverse overflow-hidden md:flex-row">
	<HomeNavbar />
	<div class="flex-1 overflow-hidden">
		{@render children()}
	</div>
</div>
