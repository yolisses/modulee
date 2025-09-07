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
		connectionHandler.start = id;
		connectionHandler.startPosition = new Vector(e.clientX, e.clientY);
		element.setPointerCapture(e.pointerId);
		e.stopPropagation();
	}

	function handlePointerUp(e: PointerEvent) {
		connectionHandler.end = undefined;
		connectionHandler.endPosition = undefined;
		connectionHandler.start = undefined;
		connectionHandler.startPosition = undefined;
		element.releasePointerCapture(e.pointerId);
		e.stopPropagation();
	}

	function handlePointerMove(e: PointerEvent) {
		if (!connectionHandler.start) return;
		console.log('test1');

		const currentPointerPosition = new Vector(e.clientX, e.clientY);
		connectionHandler.endPosition = currentPointerPosition;
	}
</script>

<div
	bind:this={element}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	class="touch-none"
>
	Connector {id}
</div>
