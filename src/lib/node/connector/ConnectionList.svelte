<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Node } from '../Node.svelte';
	import ConnectionItem from './ConnectionItem.svelte';

	const { nodes, space }: { space: Space; nodes: Node[] } = $props();
</script>

{#each nodes as node (node.id)}
	{#each node.connectors as connector (connector.id)}
		{#if connector.connectedTo}
			<ConnectionItem {space} startConnector={connector} endConnector={connector.connectedTo} />
		{/if}
	{/each}
{/each}
