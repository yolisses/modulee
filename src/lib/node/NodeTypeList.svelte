<script lang="ts">
	import type { NodeType } from './NodeType';
	import NodeTypeItem from './NodeTypeItem.svelte';

	interface Props {
		nodeTypes: NodeType[];
	}

	const { nodeTypes }: Props = $props();
</script>

{#each nodeTypes as nodeType (nodeType.id)}
	<NodeTypeItem {nodeType} />
{/each}
