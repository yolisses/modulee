<script lang="ts">
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'instruments';
</script>

<ExternalModulesPage title="Instruments" moduleType="instrument" />
