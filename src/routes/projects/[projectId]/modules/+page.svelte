<script>
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import ModulesPage from '$lib/module/ModulesPage.svelte';
	import { projectNavbarSelectionContextKey } from '$lib/project/projectNavbarSelectionContext';

	getRequiredContext(projectNavbarSelectionContextKey).projectNavbarSelection = 'modules';
</script>

<ModulesPage />
