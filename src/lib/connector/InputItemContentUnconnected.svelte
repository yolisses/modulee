<script lang="ts">
	import { clamp } from '$lib/connection/clamp';
	import type { Input } from '$lib/data/Input.svelte';
	import { formatNumber } from './formatNumber';

	interface Props {
		input: Input;
	}

	let initialValue: number;
	let element: HTMLElement;
	let initialClientX: number;
	let sizeElement: HTMLElement;
	let pointerId = $state<number>();
	const { input }: Props = $props();

	let value = $state(input.inputDefinition.defaultValue);
	const { min, max } = input.inputDefinition;
	const ratio = $derived((value - min) / (max - min));
	const percentage = $derived(100 * ratio);

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
		initialValue = value;
		pointerId = e.pointerId;
		initialClientX = e.clientX;
		element.setPointerCapture(e.pointerId);
	}

	function handlePointerUp(e: PointerEvent) {
		if (!pointerId) return;
		e.stopPropagation();
		element.releasePointerCapture(pointerId);
		pointerId = undefined;
	}

	function handlePointerMove(e: PointerEvent) {
		if (!pointerId) return;
		const range = max - min;
		const { width } = sizeElement.getBoundingClientRect();
		let delta = e.movementX / width;
		delta /= range;
		value = clamp(value + delta, min, max);
	}
</script>

<div style:width={percentage + '%'} class="absolute left-0 h-full bg-green-500/25"></div>
<div class="relative flex flex-1 flex-row items-center overflow-hidden" bind:this={sizeElement}>
	<div
		title={input.name}
		style:padding-left="0.3lh"
		class="overflow-and-ellipsis flex-1 overflow-hidden hover:bg-white/10"
	>
		{input.name}
	</div>
	<div
		bind:this={element}
		onpointerdown={handlePointerDown}
		onpointerup={pointerId ? handlePointerUp : undefined}
		onpointermove={pointerId ? handlePointerMove : undefined}
		class="flex-1 cursor-ew-resize text-end opacity-50 hover:bg-white/10"
	>
		{formatNumber(value)}
	</div>
</div>
