<script lang="ts">
	import UseEffectButton from '$lib/effect/UseEffectButton.svelte';
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
</script>

{#snippet buttons(externalModuleData: ExternalModuleData)}
	<UseEffectButton {externalModuleData} />
{/snippet}

<ExternalModulesPage title="Effects" moduleType="effect" {buttons} />
