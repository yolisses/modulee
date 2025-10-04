<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import Modal from '$lib/ui/Modal.svelte';
	import type { ModalState } from '$lib/ui/ModalState.svelte';
	import { selectedNodeIdsContextKey } from 'nodes-editor';
	import { onMount } from 'svelte';
	import { nodesName } from '../definitions/nodesName';

	interface Props {
		modalState: ModalState;
	}

	const { modalState }: Props = $props();

	let textInput: HTMLInputElement;
	const graphContext = getRequiredContext(graphContextKey);
	const selectedNodeIdsContext = getRequiredContext(selectedNodeIdsContextKey);
	const selectedNodes = $derived(
		graphContext.graph.nodes
			.values()
			.filter((node) => selectedNodeIdsContext.selectedNodeIds.has(node.id)),
	);

	onMount(() => {
		textInput.focus();
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		modalState.close();
	}
</script>

<Modal {modalState}>
	<form class="contents" onsubmit={handleSubmit}>
		<div class="modal-container outline-1 outline-white/20">
			<p>
				Rename nodes
				{#each selectedNodes as node}
					<b>{node.name ?? nodesName[node.type]}</b>
				{/each}
			</p>
			<input
				bind:this={textInput}
				class="common-input"
				name="name"
				type="text"
				value={selectedNodes[0]?.name}
			/>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" class="common-button" onclick={modalState.close}> Cancel </button>
				<button type="submit" class="primary-button"> Rename </button>
			</div>
		</div>
	</form>
</Modal>
