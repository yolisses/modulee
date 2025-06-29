<script lang="ts">
	import { getGraphContext } from '$lib/graph/graphContext';
	import { Output } from '$lib/node/Output.svelte';
	import {
		PreviewConnectionWire as BasePreviewConnectionWire,
		getPreviewConnectionContext,
	} from 'nodes-editor';
	import Wire from './Wire.svelte';

	const graphContext = getGraphContext();
	const previewConnectionContext = getPreviewConnectionContext();
	const startOnOutput = $derived.by(() => {
		const { startConnectorId } = previewConnectionContext;
		if (!startConnectorId) return false;
		const connector = graphContext.graph.connectors.getOrNull(startConnectorId);
		return connector instanceof Output;
	});
</script>

<BasePreviewConnectionWire>
	{#snippet children({ endPosition, startPosition })}
		{#if startOnOutput}
			<Wire {endPosition} {startPosition} />
		{:else}
			<Wire endPosition={startPosition} startPosition={endPosition} />
		{/if}
	{/snippet}
</BasePreviewConnectionWire>
