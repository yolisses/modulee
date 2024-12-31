<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Vector } from '$lib/space/Vector';
	import WireList from '$lib/wire/WireList.svelte';
	import type { Node } from '../Node.svelte';
	import ConnectionItem from './ConnectionItem.svelte';
	import PreviewWire from './PreviewWire.svelte';

	const {
		nodes,
		space,
		dataMinimumPosition,
	}: { space: Space; nodes: Node[]; dataMinimumPosition: Vector } = $props();
</script>

<WireList {space} {dataMinimumPosition}>
	{#each nodes as node (node.id)}
		{#each node.connectors as connector (connector.id)}
			{#if connector.connectedTo}
				<ConnectionItem {space} startConnector={connector} endConnector={connector.connectedTo} />
			{/if}
		{/each}
	{/each}
	<PreviewWire {space} />
</WireList>
