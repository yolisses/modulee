<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { getContainerContext } from '../containerContext';
	import { getElementPosition } from '../getElementPosition';
	import { getPointerPosition } from '../getPointerPosition';
	import type { Connector } from './Connector.svelte';
	import { previewWireWrapper } from './previewWireWrapper.svelte';

	interface Props {
		space: Space;
		connector: Connector;
	}
	let { space, connector }: Props = $props();

	let pointerId = $state<number>();

	let containerWrapper = getContainerContext();

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		pointerId = e.pointerId;
		containerWrapper.container.setPointerCapture(pointerId);

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewWireWrapper.previewWire = {
			startPosition: connector.position,
			endPosition: dataPosition,
		};

		containerWrapper.container.addEventListener('pointermove', handlePointerMove as any);
		containerWrapper.container.addEventListener('pointerup', handlePointerUp as any);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!pointerId) return;
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		if (previewWireWrapper.previewWire) {
			previewWireWrapper.previewWire.endPosition = dataPosition;
		}
	}

	function handlePointerUp(e: PointerEvent) {
		if (!pointerId) return;
		if (!containerWrapper.container) return;

		containerWrapper.container.releasePointerCapture(pointerId);
		pointerId = undefined;
	}
</script>

<button onpointerdown={handlePointerDown} class="hover-bg w-full items-center whitespace-nowrap">
	<div
		class="shrink-0 rounded-full bg-green-500"
		style:width="0.9em"
		style:height="0.9em"
		style:margin="0.05em"
	></div>
	<div>{connector.name}</div>
</button>
