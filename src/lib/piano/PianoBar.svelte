<script lang="ts">
	import Oscilloscope from '$lib/audio/Oscilloscope.svelte';
	import EnableMidiButton from './EnableMidiButton.svelte';
	import PianoDisplay from './PianoDisplay.svelte';
</script>

<div class="relative">
	<div class="flex">
		<div class="flex-1 overflow-hidden">
			<PianoDisplay />
		</div>
		<Oscilloscope />
	</div>
	<div class="absolute top-0 right-0 -translate-y-full rounded">
		<EnableMidiButton />
	</div>
</div>
