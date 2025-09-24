<script lang="ts">
	import type { Connection } from '$lib/connection/Connection';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { ConnectionItem, selectedNodeIdsContextKey } from 'nodes-editor';
	import Wire from './Wire.svelte';
	import { getColorFromId } from './getColorFromId';
	import { getInputPathId } from './getInputPathId';

	interface Props {
		connection: Connection;
	}

	const selectedNodeIdsContext = getRequiredContext(selectedNodeIdsContextKey);
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
		<Wire
			{endPosition}
			{isSelected}
			{startPosition}
			color={getColorFromId(connection.targetNodeId)}
		/>
	{/snippet}
</ConnectionItem>
