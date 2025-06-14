<script lang="ts">
	import { getUseInNodeIdContext } from '../internalModule/useInNodeIdContext';
	import UseExternalModuleInNodeButton from './UseExternalModuleInNodeButton.svelte';

	const useInNodeId = $derived(getUseInNodeIdContext().useInNodeId);
</script>

{#if useInNodeId}
	<UseExternalModuleInNodeButton {useInNodeId} />
{/if}
