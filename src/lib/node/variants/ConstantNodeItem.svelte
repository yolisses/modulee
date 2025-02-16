<script lang="ts">
	import { SetConstantNodeValueCommand } from '$lib/commands/node/SetConstantNodeValueCommand.js';
	import type { ConstantNode } from '$lib/data/ConstantNode.svelte';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import BaseNodeItem from '../BaseNodeItem.svelte';

	interface Props {
		constantNode: ConstantNode;
	}

	const { constantNode }: Props = $props();
	let value = $state(constantNode.extras.value);
	const editorContext = getEditorContext();
	let initialValue = $state(constantNode.extras.value);
	const projectDataContext = getProjectDataContext();

	function handleFocus() {
		initialValue = constantNode.extras.value;
	}

	function handleBlur(e: Event & { currentTarget: HTMLInputElement }) {
		const valueString = e.currentTarget.value;
		const value = parseFloat(valueString);
		if (Number.isNaN(value)) return;
		if (value === initialValue) return;

		const command = new SetConstantNodeValueCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'SetConstantNodeValueCommand',
			details: { nodeId: constantNode.id, value },
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
	}

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<BaseNodeItem node={constantNode}>
	{#snippet preInputsChildren()}
		<label onpointerdown={handlePointerDown} class="flex flex-row items-center">
			<div style:padding-left="0.25lh">value</div>
			<input
				bind:value
				type="number"
				onfocus={handleFocus}
				onchange={handleBlur}
				style:padding-right="0.25lh"
				class="w-full bg-transparent text-right"
			/>
		</label>
	{/snippet}
</BaseNodeItem>

<style>
	input {
		border-bottom-right-radius: 0.4lh;
	}

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
