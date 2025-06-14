<script lang="ts">
	import { getProjectDataContextOrUndefined } from '$lib/project/projectDataContext';
	import { getUseInNodeIdContextOrUndefined } from '../internalModule/useInNodeIdContext';
	import type { ExternalModuleData } from './ExternalModuleData';
	import CreateProjectFromExternalModuleButton from './instrument/CreateProjectFromExternalModuleButton.svelte';
	import UseExternalModuleInNodeButton from './UseExternalModuleInNodeButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const projectDataContext = getProjectDataContextOrUndefined();
	const useInNodeId = $derived(getUseInNodeIdContextOrUndefined()?.useInNodeId);
</script>

{#if projectDataContext?.projectData}
	{#if useInNodeId}
		<UseExternalModuleInNodeButton {useInNodeId} />
	{/if}
{:else}
	<!-- TODO add condition -->
	<CreateProjectFromExternalModuleButton {externalModuleData} />
{/if}
