<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { getContainerContext } from '../containerContext';
	import { getElementPosition } from '../getElementPosition';
	import { getPointerPosition } from '../getPointerPosition';
	import type { Input } from './Input.svelte';
	import { getPreviewConnectionContext } from './previewConnectionContext';

	interface Props {
		space: Space;
		input: Input;
	}
	let { space, input }: Props = $props();

	let containerWrapper = getContainerContext();

	let previewConnectionWrapper = getPreviewConnectionContext();

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewConnectionWrapper.previewConnection = {
			input: input,
			dataPointerPosition: dataPosition,
		};

		containerWrapper.container.addEventListener('pointermove', handleContainerPointerMove as any);
		containerWrapper.container.addEventListener('pointerup', handleContainerPointerUp as any);
	}

	function getDataPointerPosition(e: PointerEvent, container: Element) {
		const containerPosition = getElementPosition(container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);
		return dataPosition;
	}

	function handleContainerPointerMove(e: PointerEvent) {
		if (!containerWrapper.container) return;
		const dataPointerPosition = getDataPointerPosition(e, containerWrapper.container);
		if (previewConnectionWrapper.previewConnection) {
			previewConnectionWrapper.previewConnection.dataPointerPosition = dataPointerPosition;
		}
	}

	function handleContainerPointerUp(e: PointerEvent) {
		previewConnectionWrapper.previewConnection = undefined;

		if (!containerWrapper.container) return;
		containerWrapper.container.removeEventListener(
			'pointermove',
			handleContainerPointerMove as any,
		);
		containerWrapper.container.removeEventListener('pointerup', handleContainerPointerUp as any);
	}

	function handlePointerEnter(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		previewConnectionWrapper.previewConnection.output = input;
	}

	function handlePointerOut(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		if (previewConnectionWrapper.previewConnection.output === input) {
			previewConnectionWrapper.previewConnection.output = undefined;
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
	<div class="pointer-events-none flex-row items-center whitespace-nowrap">
		<div
			style:width="0.9em"
			style:height="0.9em"
			style:margin="0.05em"
			class="shrink-0 rounded-full bg-green-500"
		></div>
		<div>{input.id.slice(0, 6)}</div>
	</div>
</button>
