<script>
	import ModulesPage from '$lib/module/ModulesPage.svelte';
	import { getProjectNavbarSelectionContext } from '$lib/project/projectNavbarSelectionContext';

	getProjectNavbarSelectionContext().projectNavbarSelection = 'modules';
</script>

<ModulesPage />
