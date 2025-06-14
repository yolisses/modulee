<script lang="ts">
	import { getHomeNavbarSelectionContext } from '$lib/home/homeNavbarSelectionContext';
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';

	getHomeNavbarSelectionContext().homeNavbarSelection = 'instruments';
</script>

<ExternalModulesPage title="Instruments" moduleType="instrument" />
