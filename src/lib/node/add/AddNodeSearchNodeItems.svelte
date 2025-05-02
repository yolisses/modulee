<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getName } from '$lib/ui/getName';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';
	import { getNodeTypeName } from './getNodeTypeName';
	import { nodeCategoryNames } from './nodeCategoryNames';
	import { nodesName } from './nodeNames';
	import type { NodeType } from './NodeType';

	interface Props {
		addNodeMenuLogic: AddNodeMenuLogic;
	}

	const { addNodeMenuLogic }: Props = $props();
	const options = $derived(addNodeMenuLogic.getOptions());

	function compareByCategoryAndName(a: NodeType, b: NodeType) {
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
		values={options}
		getName={getNodeTypeName}
		compare={compareByCategoryAndName}
		onClick={addNodeMenuLogic.handleNodeTypeSelect}
	>
		{#snippet content({ value: nodeType })}
			<div class="mr-1 text-white/50">
				{nodeCategoryNames[nodeType.category]}
			</div>
			{getNodeTypeName(nodeType)}
		{/snippet}
	</BasicList>
{/if}
