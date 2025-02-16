<script lang="ts">
	import { Output } from '$lib/data/Output.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import {
		PreviewConnectionWire as BasePreviewConnectionWire,
		getPreviewConnectionContext,
	} from 'nodes-editor';
	import Wire from './Wire.svelte';

	const editorContext = getEditorContext();
	const previewConnectionContext = getPreviewConnectionContext();
	const startOnOutput = $derived.by(() => {
		const { startConnectorId } = previewConnectionContext;
		if (!startConnectorId) return false;
		const connector = editorContext.editor.graph.connectors.getOrNull(startConnectorId);
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
