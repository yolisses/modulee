<script lang="ts">
	import type { Connection } from '$lib/data/Connection';
	import { ConnectionItem, Vector } from 'nodes-editor';
	import Wire from './Wire.svelte';
	import { getInputPathId } from './getInputPathId';

	interface Props {
		connection: Connection;
	}

	const { connection }: Props = $props();
</script>

<ConnectionItem
	connection={{
		id: connection.id,
		endConnectorId: connection.targetNodeId,
		startConnectorId: getInputPathId(connection.inputPath),
	}}
>
	{#snippet children({
		endPosition,
		startPosition,
	}: {
		endPosition: Vector;
		startPosition: Vector;
	})}
		<Wire {startPosition} {endPosition} />
	{/snippet}
</ConnectionItem>
