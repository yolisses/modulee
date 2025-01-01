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

	let element: Element;
	let pointerId = $state<number>();

	let containerWrapper = getContainerContext();
	$inspect(containerWrapper);

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		pointerId = e.pointerId;
		element.setPointerCapture(pointerId);

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewWireWrapper.previewWire = {
			startPosition: connector.position,
			endPosition: dataPosition,
		};
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

		element.releasePointerCapture(pointerId);
		pointerId = undefined;
	}
</script>

<button
	bind:this={element}
	onpointerup={handlePointerUp}
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
	class="hover-bg w-full items-center whitespace-nowrap"
>
	<div
		class="shrink-0 rounded-full bg-green-500"
		style:width="0.9em"
		style:height="0.9em"
		style:margin="0.05em"
	></div>
	<div>{connector.name}</div>
</button>
