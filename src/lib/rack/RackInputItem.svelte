<script lang="ts">
	import { formatNumber } from '$lib/connector/formatNumber';
	import type { Input } from '$lib/data/Input.svelte';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { hashToUsize } from '$lib/engine/data/hashToUsize';
	import type { InputChangeEvent } from '$lib/utils/InputChangeEvent';
	import { tick } from 'svelte';

	interface Props {
		input: Input;
	}

	let textEditing = $state(false);
	const { input }: Props = $props();
	let textInput = $state<HTMLInputElement>();
	let value = $state(input.getUnconnectedValue());
	const { min, max, isBoolean } = $derived(input.getInputDefinition());

	const audioBackendContext = getAudioBackendContext();

	function handleKeyPress(e: Event) {
		e.preventDefault();
	}

	function handleInput(e: InputChangeEvent) {
		value = Number.parseFloat(e.currentTarget.value);
		const id = hashToUsize(input.getControlNodeId());
		audioBackendContext.audioBackend?.updateControl(id, value);
		textEditing = false;
	}

	function handleClick() {
		textEditing = true;
		tick().then(() => {
			textInput?.focus();
			textInput?.select();
		});
	}
</script>

<div class="flex flex-row items-center gap-2">
	<div>{input.name}</div>
	{#if textEditing}
		<input
			{value}
			type="number"
			onblur={handleInput}
			bind:this={textInput}
			onchange={handleInput}
			class="w-42 px-2 text-right"
		/>
	{:else}
		<input
			{max}
			{min}
			bind:value
			type="range"
			class="w-32"
			oninput={handleInput}
			onkeypress={handleKeyPress}
			step={isBoolean ? 1 : 'any'}
		/>
		<button class="common-button block min-w-8 p-0 text-right" onclick={handleClick}>
			{formatNumber(value)}
		</button>
	{/if}
</div>

<style>
	/* Remove number input arrows */
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
