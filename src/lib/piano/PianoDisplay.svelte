<script lang="ts">
	import { audioBackendContextKey } from '$lib/audio/audioBackendContext';
	import { range } from '$lib/fake/range';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { onMount } from 'svelte';
	import { activePitchesContextKey } from './activePitchesContext';
	import { PianoDisplayMidiBackend } from './PianoDisplayMidiBackend';

	const activePitchesContext = getRequiredContext(activePitchesContextKey);
	const audioBackendContext = getRequiredContext(audioBackendContextKey);

	const pitches = range(10 * 12 + 8);

	const pianoDisplayMidiBackend = new PianoDisplayMidiBackend(
		audioBackendContext.audioBackend!,
		activePitchesContext.activePitches,
	);

	onMount(() => {
		pianoDisplayMidiBackend.initialize();
		return pianoDisplayMidiBackend.destroy;
	});

	function getIsBlack(key: number) {
		return [1, 3, 6, 8, 10].includes(key % 12);
	}
</script>

<div class="overflow-auto">
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<div class="relative flex min-w-fit flex-row">
		<div class="flex h-10 flex-1 flex-row">
			{#each pitches as pitch}
				{#if !getIsBlack(pitch)}
					<button
						class:bg-blue-500={activePitchesContext.activePitches.has(pitch)}
						class:bg-white={!activePitchesContext.activePitches.has(pitch)}
						class="flex min-w-3 flex-1 flex-col justify-end text-xs text-black outline outline-black"
						onpointerup={(e) => pianoDisplayMidiBackend.setNoteOff(pitch)}
						onpointerdown={(e) => pianoDisplayMidiBackend.setNoteOn(pitch)}
						onpointerenter={(e) => pianoDisplayMidiBackend.handlePointerEnter(e, pitch)}
						onpointerleave={(e) => pianoDisplayMidiBackend.handlePointerLeave(e, pitch)}
					>
					</button>
				{/if}
			{/each}
		</div>
		<div class="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-3/4 flex-row">
			{#each pitches as pitch}
				<div class="flex flex-1 flex-col items-center" class:self-start={!getIsBlack(pitch)}>
					{#if getIsBlack(pitch)}
						<button
							class="pointer-events-auto w-full flex-1"
							class:bg-black={!activePitchesContext.activePitches.has(pitch)}
							class:bg-blue-500={activePitchesContext.activePitches.has(pitch)}
							onpointerup={(e) => pianoDisplayMidiBackend.setNoteOff(pitch)}
							onpointerdown={(e) => pianoDisplayMidiBackend.setNoteOn(pitch)}
							onpointerenter={(e) => pianoDisplayMidiBackend.handlePointerEnter(e, pitch)}
							onpointerleave={(e) => pianoDisplayMidiBackend.handlePointerLeave(e, pitch)}
						>
						</button>
					{/if}
				</div>
			{/each}
			<div class="flex flex-[0.5] flex-col items-center"></div>
		</div>
	</div>
</div>
