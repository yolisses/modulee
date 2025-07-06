<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { Output } from '$lib/node/Output';
	import {
		PreviewConnectionWire as BasePreviewConnectionWire,
		previewConnectionContextKey,
	} from 'nodes-editor';
	import Wire from './Wire.svelte';

	const previewConnectionContext = getRequiredContext(previewConnectionContextKey);
	const startOnOutput = $derived.by(() => {
		const { startConnector } = previewConnectionContext;
		return startConnector instanceof Output;
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
