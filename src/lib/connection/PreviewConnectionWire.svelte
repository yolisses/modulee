<script lang="ts">
	import { getEditorContext } from '$lib/editor/editorContext';
	import {
		PreviewConnectionWire as BasePreviewConnectionWire,
		getPreviewConnectionContext,
	} from 'nodes-editor';
	import Wire from './Wire.svelte';

	const editorContext = getEditorContext();
	const previewConnectionContext = getPreviewConnectionContext();
	const startOnOutput = $derived.by(() => {
		if (!previewConnectionContext.startConnectorId) return false;
		return editorContext.editor.outputs.containsId(previewConnectionContext.startConnectorId);
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
