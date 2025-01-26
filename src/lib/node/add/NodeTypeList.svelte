<script lang="ts">
	import { nodesName } from './nodeNames.js';
	import type { NodeType } from './NodeType.js';
	import NodeTypeItem from './NodeTypeItem.svelte';

	interface Props {
		nodeTypes: NodeType[];
		onTypeClick: (nodeType: NodeType) => void;
	}

	const { nodeTypes, onTypeClick }: Props = $props();
	const sortedNodeTypes = $derived(
		nodeTypes.toSorted((a, b) => {
			return nodesName[a.name].localeCompare(nodesName[b.name]);
		}),
	);
</script>

{#each sortedNodeTypes as nodeType (nodeType.id)}
	<NodeTypeItem {nodeType} {onTypeClick} />
{/each}
