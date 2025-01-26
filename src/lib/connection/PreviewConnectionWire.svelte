<script lang="ts">
	import { Output } from '$lib/data/Output.svelte.js';
	import type { Space } from '$lib/space/Space.js';
	import { PreviewConnectionWire as BasePreviewConnectionWire } from 'nodes-editor';
	import Wire from './Wire.svelte';

	interface Props {
		space: Space;
	}

	const { space }: Props = $props();
</script>

<BasePreviewConnectionWire>
	{#snippet children({ endPosition, startPosition, previewConnectionContext })}
		<Wire
			{space}
			startPosition={previewConnectionContext.startConnector instanceof Output
				? startPosition
				: endPosition}
			endPosition={previewConnectionContext.startConnector instanceof Output
				? endPosition
				: startPosition}
		/>
	{/snippet}
</BasePreviewConnectionWire>
