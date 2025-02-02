<script lang="ts">
	async function handleClick() {
		const audioContext = new AudioContext();
		await audioContext.audioWorklet.addModule('random-noise-processor.js');
		const randomNoiseNode = new AudioWorkletNode(audioContext, 'random-noise-processor');
		randomNoiseNode.connect(audioContext.destination);
	}
</script>

<button class="common-button" onclick={handleClick}> Click me </button>
