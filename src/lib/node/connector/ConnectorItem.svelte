<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
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

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;

		pointerId = e.pointerId;
		element.setPointerCapture(pointerId);

		previewWireWrapper.previewWire = {
			startPosition: connector.position,
			endPosition: connector.position.add(new Vector(6, 6)),
		};
	}

	function handlePointerMove(e: PointerEvent) {
		if (!pointerId) return;

		const screenPosition = getPointerPosition(e);
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
