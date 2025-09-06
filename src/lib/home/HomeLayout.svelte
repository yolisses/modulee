<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import HomeNavbar from '$lib/home/HomeNavbar.svelte';
	import { baseRouteContextKey } from '$lib/ui/baseRouteContext';
	import { setHomeNavbarSelectionContext } from './homeNavbarSelectionContext';
	let { children } = $props();

	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	baseRouteContext.baseRoute = '';

	const homeNavbarSelectionContext = $state({ homeNavbarSelection: 'instruments' });
	setHomeNavbarSelectionContext(homeNavbarSelectionContext);
</script>

<div class="flex h-svh overflow-hidden max-md:flex-col">
	<div class="flex flex-1 flex-col overflow-hidden md:order-2">
		{@render children()}
	</div>
	<HomeNavbar />
</div>
