<script lang="ts">
	import type { AudioBackend } from '$lib/engine/AudioBackend';
	import { WebMidiBackend } from '$lib/engine/WebMidiBackend';

	const audioBackend = {
		setNoteOn: console.log,
		setNoteOff: console.log,
	} as AudioBackend;
	const webMidiBacked = new WebMidiBackend(audioBackend);

	function handleClick() {
		webMidiBacked.initialize();
	}
</script>

<button onclick={handleClick}>click me</button>
