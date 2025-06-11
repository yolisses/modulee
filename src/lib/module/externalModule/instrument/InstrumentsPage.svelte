<script lang="ts">
	import type { ExternalModuleData } from '../ExternalModuleData';
	import ExternalModulesPage from '../ExternalModulesPage.svelte';
	import UseInstrumentButton from './UseInstrumentButton.svelte';
</script>

{#snippet buttons(externalModuleData: ExternalModuleData)}
	<UseInstrumentButton {externalModuleData} />
{/snippet}

<ExternalModulesPage title="Instruments" moduleType="instrument" {buttons} />
