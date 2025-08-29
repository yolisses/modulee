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
	const webMidiBackend = $derived(
		audioBackendContext.audioBackend
			? new WebMidiBackend(audioBackendContext.audioBackend, activePitchesContext.activePitches)
			: undefined,
	);

	let hasPermission = $state<boolean>();
	let hasJuceSupport = $state<boolean>();
	let hasMidiSupport = $state<boolean>();

	async function handleClick() {
		await WebMidi.enable();
		hasPermission = WebMidi.enabled;
		webMidiBackend?.initialize();
	}

	$effect(() => {
		if (hasPermission) {
			console.log(webMidiBackend);
			webMidiBackend?.initialize();
		}
	});

	onMount(() => {
		hasMidiSupport = getHasMidiSupport();
		hasJuceSupport = getHasJuceSupport();
		getHasMidiPermission().then((value) => {
			hasPermission = value;
		});
		return () => webMidiBackend?.destroy();
	});
</script>

{#if hasMidiSupport && hasJuceSupport === false && hasPermission === false}
	<button class="common-button" onclick={handleClick}> Enable MIDI </button>
{/if}
