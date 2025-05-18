<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { hashToUsize } from '$lib/engine/data/hashToUsize';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
	let value = $state(input.getUnconnectedValue());
	const { min, max, isBoolean } = $derived(input.getInputDefinition());

	const audioBackendContext = getAudioBackendContext();

	function handleKeyPress(e: Event) {
		e.preventDefault();
	}

	function handleInput() {
		const id = hashToUsize(input.getControlNodeId());
		audioBackendContext.audioBackend?.updateControl(id, value);
	}
</script>

<div>{input.name}</div>
<input
	{max}
	{min}
	bind:value
	type="range"
	oninput={handleInput}
	onkeypress={handleKeyPress}
	step={isBoolean ? 1 : 'any'}
/>
<input type="text" bind:value class="text-center" />
