<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { getDataPointerPosition } from '$lib/utils/getDataPointerPosition';
	import Dot from '../connector/Dot.svelte';
	import { getContainerContext } from '../containerContext';
	import { getElementPosition } from '../getElementPosition';
	import { getPointerPosition } from '../getPointerPosition';
	import { Input } from '../input/Input.svelte';
	import { getPreviewConnectionContext } from '../input/previewConnectionContext';
	import type { Output } from './Output.svelte';

	interface Props {
		space: Space;
		output: Output;
		editor: Editor;
	}
	let { space, output, editor }: Props = $props();

	let containerWrapper = getContainerContext();

	let previewConnectionWrapper = getPreviewConnectionContext();

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewConnectionWrapper.previewConnection = {
			startConnector: output,
			dataPointerPosition: dataPosition,
		};

		containerWrapper.container.addEventListener('pointermove', handleContainerPointerMove as any);
		// containerWrapper.container.addEventListener('pointerup', handleContainerPointerUp as any);
	}

	function handleContainerPointerMove(e: PointerEvent) {
		if (!containerWrapper.container) return;
		const dataPointerPosition = getDataPointerPosition(e, space, containerWrapper.container);
		if (previewConnectionWrapper.previewConnection) {
			previewConnectionWrapper.previewConnection.dataPointerPosition = dataPointerPosition;
		}
	}

	function handlePointerEnter(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector } = previewConnectionWrapper.previewConnection;

		if (startConnector instanceof Input) {
			previewConnectionWrapper.previewConnection.endConnector = output;
		}
	}

	function handlePointerOut(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector, endConnector } = previewConnectionWrapper.previewConnection;

		if (startConnector instanceof Input && endConnector === output) {
			previewConnectionWrapper.previewConnection.endConnector = undefined;
		}
	}
</script>

<button
	class="hover-bg w-full"
	onpointerout={handlePointerOut}
	onpointerdown={handlePointerDown}
	onpointerenter={handlePointerEnter}
>
	<!-- TODO consider using some other approach to prevent
 children events of pointer out. E.g.: replace pointer events
 by mouse events  -->
	<div class="pointer-events-none w-full flex-row-reverse items-center whitespace-nowrap">
		<Dot />
		<div>{output.id.slice(0, 6)}</div>
	</div>
</button>
