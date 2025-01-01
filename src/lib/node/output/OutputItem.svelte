<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { getPreviewConnectionContext } from '../input/previewConnectionContext';
	import type { Output } from './Output.svelte';

	interface Props {
		space: Space;
		output: Output;
	}
	let { space, output }: Props = $props();

	let previewConnectionWrapper = getPreviewConnectionContext();

	function handlePointerEnter(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		previewConnectionWrapper.previewConnection.output = output;
	}

	function handlePointerOut(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		if (previewConnectionWrapper.previewConnection.output === output) {
			previewConnectionWrapper.previewConnection.output = undefined;
		}
	}
</script>

<button class="hover-bg w-full" onpointerout={handlePointerOut} onpointerenter={handlePointerEnter}>
	<!-- TODO consider using some other approach to prevent
 children events of pointer out. E.g.: replace pointer events
 by mouse events  -->
	<div class="pointer-events-none w-full flex-row-reverse items-center whitespace-nowrap">
		<div
			style:width="0.8em"
			style:height="0.8em"
			style:margin="0.1em"
			class="shrink-0 rounded-full bg-green-500"
		></div>
		<div>{output.id.slice(0, 6)}</div>
	</div>
</button>
