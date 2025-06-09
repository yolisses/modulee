<script>
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import { getProjectNavbarSelectionContext } from '$lib/project/projectNavbarSelectionContext';

	const projectNavbarSelectionContext = getProjectNavbarSelectionContext();
	projectNavbarSelectionContext.projectNavbarSelection = 'externalModules';
</script>

<ExternalModulesPage title="External modules" />
