<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import Wire from '$lib/wire/Wire.svelte';
	import type { PreviewConnection } from './PreviewConnection';

	interface Props {
		space: Space;
		previewConnection: PreviewConnection;
	}

	const { space, previewConnection }: Props = $props();
</script>

<Wire
	{space}
	endPosition={previewConnection.input.connectorPosition}
	startPosition={previewConnection.output?.connectorPosition ??
		previewConnection.dataPointerPosition}
/>
