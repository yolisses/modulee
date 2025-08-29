<script lang="ts">
	import { audioBackendContextKey } from '$lib/audio/audioBackendContext';
	import { getHasJuceSupport } from '$lib/audio/getHasJuceSupport';
	import { getHasMidiPermission } from '$lib/audio/getHasMidiPermission';
	import { getHasMidiSupport } from '$lib/audio/getHasMidiSupport';
	import { WebMidiBackend } from '$lib/audio/WebMidiBackend';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { onMount } from 'svelte';
	import { WebMidi } from 'webmidi';
	import { activePitchesContextKey } from './activePitchesContext';

	const activePitchesContext = getRequiredContext(activePitchesContextKey);
	const audioBackendContext = getRequiredContext(audioBackendContextKey);
	const webMidiBackend = new WebMidiBackend(
		audioBackendContext.audioBackend!,
		activePitchesContext.activePitches,
	);

	let hasPermission = $state<boolean>();
	let hasJuceSupport = $state<boolean>();
	let hasMidiSupport = $state<boolean>();

	async function handleClick() {
		await WebMidi.enable();
		hasPermission = getHasMidiSupport();
	}

	onMount(() => {
		hasMidiSupport = getHasMidiSupport();
		hasJuceSupport = getHasJuceSupport();
		getHasMidiPermission().then((value) => {
			hasPermission = value;
			if (hasPermission) {
				webMidiBackend?.initialize();
			}
		});
		return () => webMidiBackend?.destroy();
	});
</script>

{#if hasMidiSupport && hasJuceSupport === false && hasPermission === false}
	<button class="common-button" onclick={handleClick}> Enable MIDI </button>
{/if}
