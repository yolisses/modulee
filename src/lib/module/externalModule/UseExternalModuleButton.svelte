<script lang="ts">
	import { getProjectDataContextOrUndefined } from '$lib/project/ui/projectDataContextext';
	import { getUseExternalModuleInContextOrUndefined } from '../internalModule/useExternalModuleInContext';
	import type { EffectData } from './effect/EffectData';
	import UseEffectButton from './effect/UseEffectButton.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';
	import CreateProjectFromExternalModuleButton from './instrument/CreateProjectFromExternalModuleButton.svelte';
	import UseExternalModuleInNodeButton from './UseExternalModuleInNodeButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const projectDataContext = getProjectDataContextOrUndefined();

	const useExternalModuleInContext = getUseExternalModuleInContextOrUndefined();
</script>

{#if projectDataContext?.projectData}
	{#if useExternalModuleInContext?.useExternalModuleIn}
		{#if useExternalModuleInContext.useExternalModuleIn.type === 'moduleNode'}
			<UseExternalModuleInNodeButton
				{externalModuleData}
				useInNodeId={useExternalModuleInContext.useExternalModuleIn.moduleNodeId}
			/>
		{:else if useExternalModuleInContext.useExternalModuleIn.type === 'rack'}
			{#if externalModuleData.moduleType === 'effect'}
				<UseEffectButton effectData={externalModuleData as EffectData} />
			{/if}
		{/if}
	{/if}
{:else if externalModuleData.moduleType === 'instrument'}
	<CreateProjectFromExternalModuleButton {externalModuleData} />
{/if}
