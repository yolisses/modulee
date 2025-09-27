<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		audioContext: AudioContext;
	}

	const { audioContext }: Props = $props();
	let canvas: HTMLCanvasElement;
	const height = 32;
	const width = 128;

	function drawScope() {
		const canvasContext = canvas.getContext('2d')!;
		canvasContext.clearRect(0, 0, width, height);
		canvasContext.moveTo(0, 0);
		canvasContext.lineWidth = 2;
		canvasContext.strokeStyle = 'red';
		canvasContext.lineTo(width / 2, height / 2);
		canvasContext.stroke();
	}

	onMount(() => {
		drawScope();

		const id = requestAnimationFrame(drawScope);

		return () => cancelAnimationFrame(id);
	});
</script>

<canvas bind:this={canvas} {width} {height} class="box-border border"></canvas>
