<script lang="ts">
	import { hashToUsize } from '$lib/audio/data/hashToUsize';
	import { SetUnconnectedInputValueCommand } from '$lib/commands/node/SetUnconnectedInputValueCommand';
	import { createId } from '$lib/global/createId';
	import type { InputWithControl } from '$lib/input/InputWithControl';
	import { formatNumber } from '$lib/ui/formatNumber';
	import type { InputChangeEvent } from '$lib/utils/InputChangeEvent';
	import { tick } from 'svelte';

	interface Props {
		input: InputWithControl;
	}

	let textEditing = $state(false);
	const { input }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	let textInput = $state<HTMLInputElement>();
	let initialValue = input.getUnconnectedValue();
	let value = $state(initialValue);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const { min, max, isBoolean } = $derived(input.getInputDefinition());

	const audioBackendContext = getRequiredContext(audioBackendContextKey);

	function handleKeyPress(e: Event) {
		e.preventDefault();
	}

	function handleInput(e: InputChangeEvent) {
		value = Number.parseFloat(e.currentTarget.value);
		const id = hashToUsize(input.getControlNodeId());
		audioBackendContext.audioBackend?.updateControl(id, value);
	}

	function handleChange() {
		textEditing = false;
		if (value === initialValue) return;
		initialValue = value;
		const command = new SetUnconnectedInputValueCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'SetUnconnectedInputValueCommand',
			projectId: projectDataContext.projectData.id,
			details: { value, inputPath: structuredClone(input.inputPath) },
		});
		editorContext.editor.execute(command);
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
	{#if input.targetNode}
		<div class="flex-1 text-center opacity-50">Connected</div>
	{:else if textEditing}
		<input
			{value}
			type="number"
			onblur={handleChange}
			oninput={handleInput}
			bind:this={textInput}
			onchange={handleChange}
			class="flex-1 px-2 text-right"
		/>
	{:else}
		<input
			{max}
			{min}
			bind:value
			type="range"
			class="flex-1"
			oninput={handleInput}
			onchange={handleChange}
			onkeypress={handleKeyPress}
			step={isBoolean ? 1 : 'any'}
		/>
		<button class="common-button block min-w-9 p-0 text-right" onclick={handleClick}>
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
		appearance: none;
		-moz-appearance: textfield;
	}
</style>
