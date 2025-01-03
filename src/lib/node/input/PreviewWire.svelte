<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import Wire from '$lib/wire/Wire.svelte';
	import { Output } from '../output/Output.svelte';
	import type { PreviewConnection } from './PreviewConnection';

	interface Props {
		space: Space;
		previewConnection: PreviewConnection;
	}

	const { space, previewConnection }: Props = $props();

	// TODO find a more legible way to do this
	const [input, output] = $derived.by(function () {
		const { startConnector, endConnector } = previewConnection;
		if (startConnector instanceof Output) {
			return [startConnector, endConnector];
		} else {
			return [endConnector, startConnector];
		}
	});
</script>

<Wire
	{space}
	endPosition={output?.jointPosition ?? previewConnection.dataPointerPosition}
	startPosition={input?.jointPosition ?? previewConnection.dataPointerPosition}
/>
