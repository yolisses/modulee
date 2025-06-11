<script lang="ts">
	import ExternalModulesPage from '../ExternalModulesPage.svelte';
	import type { InstrumentData } from './InstrumentData';
	import UseInstrumentButton from './UseInstrumentButton.svelte';
</script>

{#snippet buttons(instrumentData: InstrumentData)}
	<UseInstrumentButton {instrumentData} />
{/snippet}

<ExternalModulesPage title="Instruments" moduleType="instrument" {buttons} />
