<script lang="ts">
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import type { EffectData } from './EffectData';
	import UseEffectButton from './UseEffectButton.svelte';
</script>

{#snippet buttons(effectData: EffectData)}
	<UseEffectButton {effectData} />
{/snippet}

<ExternalModulesPage title="Effects" moduleType="effect" {buttons} />
