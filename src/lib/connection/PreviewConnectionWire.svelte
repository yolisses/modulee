<script lang="ts">
	import { Output } from '$lib/data/Output.svelte.js';
	import { getEditorContext } from '$lib/editor/editorContext';
	import {
		PreviewConnectionWire as BasePreviewConnectionWire,
		getPreviewConnectionContext,
		Vector,
	} from 'nodes-editor';
	import Wire from './Wire.svelte';

	const editorContext = getEditorContext();
	const previewConnectionContext = getPreviewConnectionContext();

	function getDirectionalStartPosition(startPosition: Vector, endPosition: Vector) {
		const { startConnectorId } = previewConnectionContext;
		if (!startConnectorId) {
			return startPosition;
		}
		const startConnector = editorContext.editor.connections.getOrNull(startConnectorId);
		if (startConnector instanceof Output) {
			return startPosition;
		} else {
			return endPosition;
		}
	}

	function getDirectionalEndPosition(startPosition: Vector, endPosition: Vector) {
		const { endConnectorId } = previewConnectionContext;
		if (!endConnectorId) {
			return endPosition;
		}
		const startConnector = editorContext.editor.connections.getOrNull(endConnectorId);
		if (startConnector instanceof Output) {
			return endPosition;
		} else {
			return startPosition;
		}
	}
</script>

<BasePreviewConnectionWire>
	{#snippet children({ endPosition, startPosition })}
		<Wire
			endPosition={getDirectionalEndPosition(startPosition, endPosition)}
			startPosition={getDirectionalStartPosition(startPosition, endPosition)}
		/>
	{/snippet}
</BasePreviewConnectionWire>
