<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import { getExternalModulesRepository } from './getExternalModulesRepository';

	interface Props {
		closeModal: () => void;
		externalModuleId: string;
	}

	let cancelButton: HTMLButtonElement;
	const { closeModal, externalModuleId }: Props = $props();
	const externalModules = getExternalModulesRepository();

	function handleClick() {
		externalModules.deleteExternalModule(externalModuleId);
		closeModal();
	}

	onMount(() => {
		cancelButton.focus();
	});
</script>

<Modal {closeModal}>
	<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
		<p>Delete external module?</p>
		<p>This action is irreversible.</p>
		<div class="flex flex-row justify-end gap-2">
			<button bind:this={cancelButton} class="common-button" onclick={closeModal}> Cancel </button>
			<button class="rounded bg-red-500 p-2 hover:bg-red-600" onclick={handleClick}>
				Delete
			</button>
		</div>
	</div>
</Modal>
