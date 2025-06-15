<script>
	import HelpPage from '$lib/help/HelpPage.svelte';
	import { getHomeNavbarSelectionContext } from '$lib/home/homeNavbarSelectionContext';

	getHomeNavbarSelectionContext().homeNavbarSelection = 'help';
</script>

<HelpPage />
