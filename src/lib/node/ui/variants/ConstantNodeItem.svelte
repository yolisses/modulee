<script lang="ts">
	import { SetConstantNodeValueCommand } from '$lib/commands/node/attribute/SetConstantNodeValueCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId.js';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphRegistryContextKey } from '$lib/graph/graphRegistryContext';
	import type { ConstantNode } from '$lib/node/ConstantNode';
	import { cloneGraphRegistry } from '$lib/process/cloneGraphRegistry';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import type { InputChangeEvent } from '$lib/utils/InputChangeEvent';
	import BaseNodeItem from './BaseNodeItem.svelte';

	interface Props {
		constantNode: ConstantNode;
	}

	const { constantNode }: Props = $props();
	let value = $state(constantNode.extras.value);
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const graphRegistryContext = getRequiredContext(graphRegistryContextKey);

	$effect(() => {
		const nodeData = graphRegistryContext.graphRegistry.nodes.get(constantNode.id);
		if (nodeData.type === 'ConstantNode') {
			value = nodeData.extras.value;
		}
	});

	function handleInput(e: InputChangeEvent) {
		const valueString = e.currentTarget.value;
		const value = parseFloat(valueString);
		if (Number.isNaN(value)) return;

		const nodeData = graphRegistryContext.graphRegistry.nodes.get(constantNode.id);
		if (nodeData.type === 'ConstantNode') {
			nodeData.extras.value = value;
		}
		graphRegistryContext.graphRegistry = cloneGraphRegistry(graphRegistryContext.graphRegistry);
	}

	function handleChange(e: InputChangeEvent) {
		const valueString = e.currentTarget.value;
		const value = parseFloat(valueString);
		if (Number.isNaN(value)) return;

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
				oninput={handleInput}
				onchange={handleChange}
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
