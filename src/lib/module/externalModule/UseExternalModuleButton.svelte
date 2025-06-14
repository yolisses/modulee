<script lang="ts">
	import { getUseInNodeIdContextOrUndefined } from '../internalModule/useInNodeIdContext';
	import type { ExternalModuleData } from './ExternalModuleData';
	import CreateProjectFromExternalModuleButton from './instrument/CreateProjectFromExternalModuleButton.svelte';
	import UseExternalModuleInNodeButton from './UseExternalModuleInNodeButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const useInNodeId = $derived(getUseInNodeIdContextOrUndefined()?.useInNodeId);
</script>

{#if useInNodeId}
	<UseExternalModuleInNodeButton {useInNodeId} />
{/if}

<!-- TODO add condition -->
<CreateProjectFromExternalModuleButton {externalModuleData} />
