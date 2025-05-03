<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getName } from '$lib/ui/getName';
	import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import type { NodeDefinition } from '../definitions/NodeDefinition';
	import { nodesName } from '../definitions/nodesName';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';

	interface Props {
		addNodeMenuLogic: AddNodeMenuLogic;
	}

	const { addNodeMenuLogic }: Props = $props();
	const options = $derived(addNodeMenuLogic.getOptions());

	function compareByCategoryAndName(a: NodeDefinition, b: NodeDefinition) {
		const aFullText = nodeCategoryNames[a.category] + ' ' + nodesName[a.name];
		const bFullText = nodeCategoryNames[b.category] + ' ' + nodesName[b.name];
		return aFullText.localeCompare(bFullText);
	}
</script>

{#if options.length === 0}
	<div class="p-2 text-white/50">No options found for the search text</div>
{:else}
	<BasicList
		getId={getName}
		items={options}
		getName={getNodeDefinitionName}
		compare={compareByCategoryAndName}
		onClick={addNodeMenuLogic.handleNodeDefinitionSelect}
	>
		{#snippet content({ item: nodeDefinition })}
			<div class="mr-1 text-white/50">
				{nodeCategoryNames[nodeDefinition.category]}
			</div>
			{getNodeDefinitionName(nodeDefinition)}
		{/snippet}
	</BasicList>
{/if}
