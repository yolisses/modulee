<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import WirePath from '$lib/wire/WirePath.svelte';
	import type { PreviewConnection } from './PreviewConnection';

	interface Props {
		space: Space;
		previewConnection: PreviewConnection;
	}

	const { space, previewConnection }: Props = $props();

	$inspect(previewConnection.output);
</script>

<WirePath
	endPosition={previewConnection.input.connectorPosition}
	startPosition={previewConnection.output?.connectorPosition ??
		previewConnection.dataPointerPosition}
/>
