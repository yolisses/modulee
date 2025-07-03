<script>
	import ModulesPage from '$lib/module/ModulesPage.svelte';

	getRequiredContext(projectNavbarSelectionContextKey).projectNavbarSelection = 'modules';
</script>

<ModulesPage />
