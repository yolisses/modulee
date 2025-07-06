<script>
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import PluginPage from '$lib/plugin/PluginPage.svelte';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'plugin';
</script>

<PluginPage />
