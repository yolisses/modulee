<script>
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import HelpPage from '$lib/help/HelpPage.svelte';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'help';
</script>

<HelpPage />
