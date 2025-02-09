<script lang="ts">
	import { SetConstantNodeValue } from '$lib/commands/SetConstantNodeValue.js';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import type { Node } from '../data/Node.svelte.js';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
	let value = $state(node.extras.value);
	const editorContext = getEditorContext();
	let initialValue = $state(node.extras.value);
	const projectDataContext = getProjectDataContext();

	function handleFocus() {
		initialValue = node.extras.value;
	}

	function handleBlur(e: Event & { currentTarget: HTMLInputElement }) {
		const valueString = e.currentTarget.value;
		const value = parseFloat(valueString);
		if (Number.isNaN(value)) return;
		if (value === initialValue) return;

		const command = new SetConstantNodeValue({
			id: createId(),
			type: 'SetConstantNodeValue',
			createdAt: new Date().toJSON(),
			details: { nodeId: node.id, value },
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
	}
</script>

<NodeItem {node}>
	<input
		bind:value
		type="number"
		onfocus={handleFocus}
		onchange={handleBlur}
		class="bg-transparent px-2 text-right"
	/>
</NodeItem>

<style>
	input {
		padding-inline: 0.4lh;
		border-bottom-left-radius: 0.4lh;
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
