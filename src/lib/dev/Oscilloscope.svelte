<script lang="ts">
	interface Props {
		data: Float32Array;
	}

	const { data }: Props = $props();
	let canvas = $state<HTMLCanvasElement>();
	const ctx = $derived(canvas?.getContext('2d'));

	function drawWave(
		data: Float32Array,
		canvas: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
	): void {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#0f0';
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

	$effect(() => {
		if (data && canvas && ctx) {
			drawWave(data, canvas, ctx);
		}
	});
</script>

<canvas bind:this={canvas} width="800" height="400"></canvas>
