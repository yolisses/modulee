<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { Output } from '$lib/node/Output';
	import {
		PreviewConnectionWire as BasePreviewConnectionWire,
		previewConnectionContextKey,
	} from 'nodes-editor';
	import PreviewConnectionPlus from './PreviewConnectionPlus.svelte';
	import Wire from './Wire.svelte';

	const previewConnectionContext = getRequiredContext(previewConnectionContextKey);
	const startIsOutput = $derived.by(() => {
		const { startConnector } = previewConnectionContext;
		return startConnector instanceof Output;
	});
</script>

<BasePreviewConnectionWire>
	{#snippet children({ endPosition, startPosition })}
		{#snippet a()}
			{#if !previewConnectionContext.endConnector}
				<PreviewConnectionPlus position={endPosition} />
			{/if}
		{/snippet}

		{#if startIsOutput}
			<Wire {endPosition} {startPosition} children={a} />
		{:else}
			<Wire endPosition={startPosition} startPosition={endPosition} children={a} />
		{/if}
	{/snippet}
</BasePreviewConnectionWire>
