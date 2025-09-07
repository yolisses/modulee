<script lang="ts">
	import { clamp } from '$lib/connection/clamp';

	let element: HTMLElement;
	let initialValue = $state<number>();
	let initialPointerX = $state<number>();
	let value = $state(0.5);

	function handlePointerDown(e: PointerEvent) {
		console.log('here');
		initialValue = value;
		initialPointerX = e.clientX;
		element.setPointerCapture(e.pointerId);
		e.stopPropagation();
	}

	function handlePointerUp(e: PointerEvent) {
		initialPointerX = undefined;
		initialValue = undefined;
		element.releasePointerCapture(e.pointerId);
		e.stopPropagation();
	}

	function handlePointerMove(e: PointerEvent) {
		if (initialValue === undefined) return;
		if (!initialPointerX) return;
		const currentPointerXDelta = e.clientX - initialPointerX;
		const currentValueDelta = currentPointerXDelta / element.clientWidth;
		value = clamp(initialValue + currentValueDelta, 0, 1);
	}
</script>

<div
	bind:this={element}
	class="relative h-10 w-32 bg-white/10"
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
>
	<div style:width={value * 100 + '%'} class="absolute h-full bg-green-500"></div>
</div>
{value.toFixed(2)}
