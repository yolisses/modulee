<script lang="ts">
	import { onMount } from 'svelte';
	import type { OscilloscopeHandler } from './OscilloscopeHandler';

	interface Props {
		oscilloscopeHandler: OscilloscopeHandler;
	}

	const { oscilloscopeHandler }: Props = $props();
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationFrameId: number;

	function drawWave(): void {
		if (!ctx) return;
		const { data } = oscilloscopeHandler;
		if (!data) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();

		const sliceWidth = canvas.width / data.length;
		let x = 0;

		let clipped = false;
		for (let i = 0; i < data.length; i++) {
			const value = data[i];
			// Normalize [-1, 1] to [0, 1]
			const v = value * 0.5 + 0.5;
			const y = v * canvas.height;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			if (value > 1 || value < -1) {
				clipped = true;
			}

			x += sliceWidth;
		}

		ctx.strokeStyle = clipped ? '#ef4444' : '#3b82f6';
		ctx.stroke();
	}

	const animate = () => {
		drawWave();
		animationFrameId = requestAnimationFrame(animate);
	};

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		ctx.lineWidth = 1;

		animate();
		return () => cancelAnimationFrame(animationFrameId);
	});
</script>

<canvas bind:this={canvas} width="128" height="32" class="bg-black"></canvas>
