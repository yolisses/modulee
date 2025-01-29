<script lang="ts">
	import { Output } from '$lib/data/Output.svelte.js';
	import { PreviewConnectionWire as BasePreviewConnectionWire } from 'nodes-editor';
	import Wire from './Wire.svelte';
</script>

<BasePreviewConnectionWire>
	{#snippet children({ endPosition, startPosition, previewConnectionContext })}
		<Wire
			startPosition={previewConnectionContext.startConnector instanceof Output
				? startPosition
				: endPosition}
			endPosition={previewConnectionContext.startConnector instanceof Output
				? endPosition
				: startPosition}
		/>
	{/snippet}
</BasePreviewConnectionWire>
