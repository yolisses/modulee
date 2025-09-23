<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import CreateInternalModuleButton from './CreateInternalModuleButton.svelte';
	import InternalModulesNavbarItem from './InternalModulesNavbarItem.svelte';

	const graphContext = getRequiredContext(graphContextKey);
	const internalModules = $derived(graphContext.graph.internalModules.values());
</script>

<div class="flex flex-row overflow-auto border-b-2 border-black/50">
	{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
		<InternalModulesNavbarItem {internalModule} />
	{/each}
	<CreateInternalModuleButton />
</div>
