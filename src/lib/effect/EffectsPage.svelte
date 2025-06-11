<script lang="ts">
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import UseEffectButton from '$lib/module/externalModule/UseEffectButton.svelte';
</script>

{#snippet buttons(externalModuleData: ExternalModuleData)}
	<UseEffectButton {externalModuleData} />
{/snippet}

<ExternalModulesPage title="Effects" moduleType="effect" {buttons} />
