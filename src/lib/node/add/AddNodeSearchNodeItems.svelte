<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getType } from '$lib/ui/getType';
	import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import type { NodeDefinition } from '../definitions/NodeDefinition';
	import { nodesName } from '../definitions/nodesName';
	import { AddNodeHandler } from './AddNodeHandler';
	import { getCanNodeBeAdded } from './getCanNodeBeAdded';
	import { getNodeDefinitionsBySearchText } from './getNodeDefinitionsBySearchText';

	interface Props {
		searchText: string;
	}

	const { searchText }: Props = $props();
	const addNodeHandler = new AddNodeHandler();
	const nodeDefinitions = $derived(getNodeDefinitionsBySearchText(searchText));

	function compareByCategoryAndName(a: NodeDefinition, b: NodeDefinition) {
		const aFullText = nodeCategoryNames[a.category] + ' ' + nodesName[a.type];
		const bFullText = nodeCategoryNames[b.category] + ' ' + nodesName[b.type];
		return aFullText.localeCompare(bFullText);
	}
</script>

{#if nodeDefinitions.length === 0}
	<div class="p-2 text-white/50">No options found for the search text</div>
{:else}
	<BasicList
		compare={compareByCategoryAndName}
		getId={getType}
		getName={getNodeDefinitionName}
		items={nodeDefinitions.filter(getCanNodeBeAdded)}
		onClick={addNodeHandler.handleNodeDefinitionSelect}
	>
		{#snippet content({ item: nodeDefinition })}
			<div class="mr-1 text-white/50">
				{nodeCategoryNames[nodeDefinition.category]}
			</div>
			{getNodeDefinitionName(nodeDefinition)}
		{/snippet}
	</BasicList>
{/if}
