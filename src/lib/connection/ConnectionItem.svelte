<script lang="ts">
	import type { Connection } from '$lib/data/Connection';
	import { ConnectionItem, getSelectedNodeIdsContext } from 'nodes-editor';
	import Wire from './Wire.svelte';
	import { getInputPathId } from './getInputPathId';

	interface Props {
		connection: Connection;
	}

	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	const { connection }: Props = $props();

	const isSelected = $derived.by(() => {
		const { selectedNodeIds } = selectedNodeIdsContext;
		return (
			selectedNodeIds.has(connection.targetNodeId) &&
			selectedNodeIds.has(connection.inputPath.nodeId)
		);
	});
</script>

<ConnectionItem
	connection={{
		id: connection.id,
		startConnectorId: connection.targetNodeId,
		endConnectorId: getInputPathId(connection.inputPath),
	}}
>
	{#snippet children({ endPosition, startPosition })}
		<Wire {startPosition} {endPosition} {isSelected} />
	{/snippet}
</ConnectionItem>
