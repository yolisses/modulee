<script lang="ts">
	import { clamp } from '$lib/connection/clamp';
	import type { Input } from '$lib/data/Input.svelte';
	import { formatNumber } from './formatNumber';

	interface Props {
		input: Input;
	}

	let element: HTMLElement;
	let initialValue: number;
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
		pointerId = e.pointerId;
		initialClientX = e.clientX;
		initialValue = value;
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
		const { width } = sizeElement.getBoundingClientRect();
		const mouseDelta = e.clientX - initialClientX; // Total movement since click
		const fractionDelta = mouseDelta / width; // Normalize to [0, 1] per slider width
		const valueDelta = fractionDelta * (max - min); // Scale to value range
		value = clamp(initialValue + valueDelta, min, max); // Apply to initial value
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
