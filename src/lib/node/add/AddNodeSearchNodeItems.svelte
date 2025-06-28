<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getType } from '$lib/ui/getType';
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
		const aFullText = nodeCategoryNames[a.category] + ' ' + nodesName[a.type];
		const bFullText = nodeCategoryNames[b.category] + ' ' + nodesName[b.type];
		return aFullText.localeCompare(bFullText);
	}
</script>

{#if options.length === 0}
	<div class="p-2 text-white/50">No options found for the search text</div>
{:else}
	<BasicList
		getId={getType}
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
