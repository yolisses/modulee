<script lang="ts">
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import { nodeDefinitionCategories } from '../definitions/nodeDefinitionCategories';
	import type { NodeDefinitionCategory } from '../definitions/NodeDefinitionCategory';
	import AddNodeCategoryItem from './AddNodeCategoryItem.svelte';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';

	interface Props {
		addNodeMenuLogic: AddNodeMenuLogic;
	}

	const { addNodeMenuLogic }: Props = $props();

	function getNodeDefinitionCategoryText(nodeDefinitionCategory: NodeDefinitionCategory) {
		return nodeCategoryNames[nodeDefinitionCategory.name];
	}

	const sortedNodeDefinitionCategories = $derived(
		nodeDefinitionCategories.sort((a, b) =>
			getNodeDefinitionCategoryText(a).localeCompare(getNodeDefinitionCategoryText(b)),
		),
	);
</script>

{#each sortedNodeDefinitionCategories as nodeDefinitionCategory}
	<AddNodeCategoryItem {addNodeMenuLogic} {nodeDefinitionCategory} />
{/each}
