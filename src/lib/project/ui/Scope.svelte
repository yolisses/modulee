<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		audioContext: AudioContext;
	}

	const { audioContext }: Props = $props();
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let oscillator: OscillatorNode | null = null;
	let workletNode: AudioWorkletNode | null = null;
	let isPlaying: boolean = false;

	async function setupWorklet(): Promise<void> {
		if (audioContext) {
			await audioContext.audioWorklet.addModule('/waveProcessor.js');
			workletNode = new AudioWorkletNode(audioContext, 'wave-processor');
			workletNode.connect(audioContext.destination);
		}
	}

	function createOscillator(): void {
		if (audioContext) {
			oscillator = audioContext.createOscillator();
			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
			if (workletNode) oscillator.connect(workletNode);
		}
	}

	function drawWave(data: Float32Array, bufferLength: number): void {
		if (!isPlaying || !ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 1;
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
		await setupWorklet();

		if (isPlaying) {
			if (oscillator) {
				oscillator.stop(audioContext!.currentTime);
				isPlaying = false;
			}
		} else {
			createOscillator();
			if (oscillator && workletNode) {
				workletNode.port.onmessage = (e: MessageEvent) => {
					drawWave(e.data, e.data.length);
					requestAnimationFrame(() => {});
				};
				oscillator.start(audioContext!.currentTime);
				isPlaying = true;
			}
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		return () => {
			if (oscillator) oscillator.stop();
			if (audioContext) audioContext.close();
		};
	});
</script>

<button onclick={toggleAudio}>Play/Pause Audio</button>
<canvas bind:this={canvas} width="128" height="32" class="bg-black"></canvas>
