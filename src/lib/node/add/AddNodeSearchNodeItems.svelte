<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getName } from '$lib/ui/getName';
	import { getNodeTypeName } from '../definitions/getNodeTypeName';
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import { nodesName } from '../definitions/nodeNames';
	import type { NodeType } from '../definitions/NodeType';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';

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
		items={options}
		getName={getNodeTypeName}
		compare={compareByCategoryAndName}
		onClick={addNodeMenuLogic.handleNodeTypeSelect}
	>
		{#snippet content({ item: nodeType })}
			<div class="mr-1 text-white/50">
				{nodeCategoryNames[nodeType.category]}
			</div>
			{getNodeTypeName(nodeType)}
		{/snippet}
	</BasicList>
{/if}
