<script lang="ts">
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { nodeCategoryNames } from './nodeCategoryNames';
	import type { NodeTypeCategory } from './NodeTypeCategory';

	interface Props {
		nodeTypeCategory: NodeTypeCategory;
	}

	const { nodeTypeCategory }: Props = $props();
</script>

<button class="common-button">
	<div class="flex-1 text-start">
		{nodeCategoryNames[nodeTypeCategory.name]}
	</div>
	<Fa icon={faChevronRight} class="opacity-50" size="xs" />
</button>
