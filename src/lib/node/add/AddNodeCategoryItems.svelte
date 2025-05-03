<script lang="ts">
	import { nodeCategoryNames } from '../definitions/nodeCategoryNames';
	import { nodeTypeCategories } from '../definitions/nodeTypeCategories';
	import type { NodeTypeCategory } from '../definitions/NodeTypeCategory';
	import AddNodeCategoryItem from './AddNodeCategoryItem.svelte';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';

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
