<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'instruments';
</script>

<ExternalModulesPage title="Instruments" moduleType="instrument" />
