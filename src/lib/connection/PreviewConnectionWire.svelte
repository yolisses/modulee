<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { Input } from '$lib/input/Input';
	import { Output } from '$lib/node/Output';
	import {
		PreviewConnectionWire as BasePreviewConnectionWire,
		previewConnectionContextKey,
	} from 'nodes-editor';
	import PreviewConnectionPlus from './PreviewConnectionPlus.svelte';
	import Wire from './Wire.svelte';
	import { getColorFromId } from './getColorFromId';

	const previewConnectionContext = getRequiredContext(previewConnectionContextKey);
	const startIsInput = $derived(previewConnectionContext.startConnector instanceof Input);
	const startIsOutput = $derived(previewConnectionContext.startConnector instanceof Output);

	function getColorId() {
		if (previewConnectionContext.startConnector instanceof Output) {
			return previewConnectionContext.startConnector.node?.id;
		}
		if (previewConnectionContext.endConnector instanceof Output) {
			return previewConnectionContext.endConnector.node?.id;
		}
	}
</script>

<BasePreviewConnectionWire>
	{#snippet children({ endPosition, startPosition })}
		{#if startIsOutput}
			<Wire {endPosition} {startPosition} color={getColorFromId(getColorId() ?? '')}>
				{#if !previewConnectionContext.endConnector && startIsInput}
					<PreviewConnectionPlus position={endPosition} />
				{/if}
			</Wire>
		{:else}
			<Wire
				endPosition={startPosition}
				startPosition={endPosition}
				color={getColorFromId(getColorId() ?? '')}
			>
				{#if !previewConnectionContext.endConnector && startIsInput}
					<PreviewConnectionPlus position={endPosition} />
				{/if}
			</Wire>
		{/if}
	{/snippet}
</BasePreviewConnectionWire>
