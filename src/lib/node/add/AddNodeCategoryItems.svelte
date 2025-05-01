<script lang="ts">
	import AddNodeCategoryItem from './AddNodeCategoryItem.svelte';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';
	import { nodeCategoryNames } from './nodeCategoryNames';
	import { nodeTypeCategories } from './nodeTypeCategories';
	import type { NodeTypeCategory } from './NodeTypeCategory';

	interface Props {
		addNodeMenuLogic: AddNodeMenuLogic;
	}

	const { addNodeMenuLogic }: Props = $props();

	function getNodeTypeCategoryText(nodeTypeCategory: NodeTypeCategory) {
		return nodeCategoryNames[nodeTypeCategory.name];
	}

	const sortedNodeTypeCategories = $derived(
		nodeTypeCategories.sort((a, b) =>
			getNodeTypeCategoryText(a).localeCompare(getNodeTypeCategoryText(b)),
		),
	);
</script>

{#each sortedNodeTypeCategories as nodeTypeCategory}
	<AddNodeCategoryItem {addNodeMenuLogic} {nodeTypeCategory} />
{/each}
