<script lang="ts">
	import { Vector } from 'nodes-editor';
	import type { ConnectionHandler } from './ConnectionHandler.svelte';

	interface Props {
		id: string;
		connectionHandler: ConnectionHandler;
	}

	const { id, connectionHandler }: Props = $props();

	let element: HTMLElement;

	function handlePointerDown(e: PointerEvent) {
		console.log('handlePointerDown');
		element.releasePointerCapture(e.pointerId);
		connectionHandler.start = id;
		connectionHandler.startPosition = new Vector(e.clientX, e.clientY);
		// element.setPointerCapture(e.pointerId);
		e.stopPropagation();
	}

	function handlePointerUp(e: PointerEvent) {
		console.log('handlePointerUp');
		connectionHandler.end = undefined;
		connectionHandler.endPosition = undefined;
		connectionHandler.start = undefined;
		connectionHandler.startPosition = undefined;
		// element.releasePointerCapture(e.pointerId);
		e.stopPropagation();
	}

	function handlePointerMove(e: PointerEvent) {
		console.log('handlePointerMove');
		if (!connectionHandler.start) return;
		const currentPointerPosition = new Vector(e.clientX, e.clientY);
		connectionHandler.endPosition = currentPointerPosition;
	}

	function handlePointerEnter(e: PointerEvent) {
		console.log('handlePointerEnter');
	}

	function handleTouchStart(e: TouchEvent) {
		console.log('handleTouchStart');
		e.stopImmediatePropagation();
	}
</script>

<div
	bind:this={element}
	class="w-fit touch-none border"
	onpointerdown={handlePointerDown}
	onpointerenter={handlePointerEnter}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	ontouchstart={handleTouchStart}
>
	Connector {id}
</div>
