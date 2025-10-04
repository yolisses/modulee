<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import Modal from '$lib/ui/Modal.svelte';
	import { ModalState } from '$lib/ui/ModalState.svelte';
	import { onMount } from 'svelte';
	import { nodesName } from '../definitions/nodesName';
	import { renameNodesStateContextKey } from '../RenameNodesStateContext';

	let textInput: HTMLInputElement;
	const renameNodesStateContext = getRequiredContext(renameNodesStateContextKey);

	class CustomModalState extends ModalState {
		isOpen = $derived(renameNodesStateContext.nodes.length > 0);
		close = () => {
			renameNodesStateContext.nodes = [];
		};
	}

	const modalState = new CustomModalState();

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
				{#each renameNodesStateContext.nodes as node, index (node.id)}
					{#if index > 0},{/if}
					<b>{node.name ?? nodesName[node.type]}</b>
				{/each}
			</p>
			<input
				bind:this={textInput}
				class="common-input"
				name="name"
				type="text"
				value={renameNodesStateContext.nodes[0]?.name}
			/>
			<div class="flex flex-row justify-end gap-2">
				<button type="button" class="common-button" onclick={modalState.close}> Cancel </button>
				<button type="submit" class="primary-button"> Rename </button>
			</div>
		</div>
	</form>
</Modal>
