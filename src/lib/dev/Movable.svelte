<script lang="ts">
	import { Vector } from 'nodes-editor';
	import Slider from './Slider.svelte';

	let element: HTMLElement;
	let initialNodePosition = $state<Vector>();
	let initialPointerPosition = $state<Vector>();
	let position = $state(new Vector(0, 0));

	function handlePointerDown(e: PointerEvent) {
		initialNodePosition = position.clone();
		initialPointerPosition = new Vector(e.clientX, e.clientY);
		element.setPointerCapture(e.pointerId);
	}

	function handlePointerUp(e: PointerEvent) {
		initialPointerPosition = undefined;
		initialNodePosition = undefined;
		element.releasePointerCapture(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!initialNodePosition) return;
		if (!initialPointerPosition) return;
		const currentPointerPosition = new Vector(e.clientX, e.clientY);
		const currentPointerDelta = currentPointerPosition.subtract(initialPointerPosition);
		position = initialNodePosition.add(currentPointerDelta);
	}
</script>

<div
	bind:this={element}
	class="absolute touch-none bg-zinc-800"
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	style:left={position.x + 'px'}
	style:top={position.y + 'px'}
>
	<button>Move me</button>
	<div>some content here</div>
	<Slider />
</div>

<div>
	<div>initialNodePosition {initialNodePosition?.toString()}</div>
	<div>initialPointerPosition {initialPointerPosition?.toString()}</div>
</div>
