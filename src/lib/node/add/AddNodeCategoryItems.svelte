<script lang="ts">
	import AddNodeCategoryItem from './AddNodeCategoryItem.svelte';
	import { nodeCategoryNames } from './nodeCategoryNames';
	import { nodeTypeCategories } from './nodeTypeCategories';
	import type { NodeTypeCategory } from './NodeTypeCategory';

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
	<AddNodeCategoryItem {nodeTypeCategory} />
{/each}
