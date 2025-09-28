<script lang="ts">
	import { onMount } from 'svelte';
	import type { ScopeHandler } from './ScopeHandler';

	interface Props {
		scopeHandler: ScopeHandler;
	}

	const { scopeHandler }: Props = $props();
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let buffer: Float32Array;

	function drawWave(): void {
		if (!ctx) return;
		const { data } = scopeHandler;
		if (!data) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();

		const sliceWidth = canvas.width / data.length;
		let x = 0;

		for (let i = 0; i < data.length; i++) {
			const v = (data[i] + 1) / 2; // Normalize [-1, 1] to [0, 1]
			const y = v * canvas.height;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.stroke();
	}

	const animate = () => {
		drawWave();
		requestAnimationFrame(animate);
	};

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#3b82f6';
		animate();
	});
</script>

<canvas bind:this={canvas} width="128" height="32" class="bg-black"></canvas>
