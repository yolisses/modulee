<script>
	import HelpPage from '$lib/help/HelpPage.svelte';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'help';
</script>

<HelpPage />
