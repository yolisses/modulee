<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let audioCtx: AudioContext | null = null;
	let oscillator: OscillatorNode | null = null;
	let workletNode: AudioWorkletNode | null = null;
	let isPlaying: boolean = false;

	async function setupWorklet(): Promise<void> {
		if (audioCtx) {
			await audioCtx.audioWorklet.addModule('waveProcessor.js');
			workletNode = new AudioWorkletNode(audioCtx, 'wave-processor');
			workletNode.connect(audioCtx.destination);
		}
	}

	function createOscillator(): void {
		if (audioCtx) {
			oscillator = audioCtx.createOscillator();
			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
			if (workletNode) oscillator.connect(workletNode);
		}
	}

	function drawWave(data: Float32Array, bufferLength: number): void {
		if (!isPlaying || !ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#0f0';
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

	async function toggleAudio(): Promise<void> {
		if (!audioCtx) {
			audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
			await setupWorklet();
		}

		if (isPlaying) {
			if (oscillator) {
				oscillator.stop(audioCtx!.currentTime);
				isPlaying = false;
			}
		} else {
			createOscillator();
			if (oscillator && workletNode) {
				workletNode.port.onmessage = (e: MessageEvent) => {
					drawWave(e.data, e.data.length);
					requestAnimationFrame(() => {});
				};
				oscillator.start(audioCtx!.currentTime);
				isPlaying = true;
			}
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		return () => {
			if (oscillator) oscillator.stop();
			if (audioCtx) audioCtx.close();
		};
	});
</script>

<button on:click={toggleAudio}>Play/Pause Audio</button>
<canvas bind:this={canvas} id="waveCanvas" width="800" height="400"></canvas>

<style>
	:global(body) {
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: #000;
	}
	canvas {
		border: 1px solid #fff;
	}
	button {
		padding: 10px 20px;
		margin: 10px;
		font-size: 16px;
		cursor: pointer;
	}
</style>
