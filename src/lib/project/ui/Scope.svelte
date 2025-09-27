<script lang="ts">
	import { onMount } from 'svelte';
	import type { ScopeHandler } from './ScopeHandler';

	interface Props {
		scopeHandler: ScopeHandler;
	}

	const { scopeHandler }: Props = $props();
	const { audioContext } = scopeHandler;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	async function setupWorklet(): Promise<void> {
		await audioContext.audioWorklet.addModule('/waveProcessor.js');
		const workletNode = new AudioWorkletNode(audioContext, 'wave-processor');
		workletNode.connect(audioContext.destination);
		workletNode.port.onmessage = (e: MessageEvent) => {
			drawWave(e.data, e.data.length);
		};
	}

	function drawWave(data: Float32Array, bufferLength: number): void {
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();

		const sliceWidth = canvas.width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
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

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#3b82f6';
		setupWorklet();
		scopeHandler.drawWave = drawWave;
	});
</script>

<canvas bind:this={canvas} width="128" height="32" class="bg-black"></canvas>
