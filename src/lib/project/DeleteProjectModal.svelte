<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import { getProjectsRepository } from './getProjectsRepository';

	interface Props {
		closeModal: () => void;
		projectId: string;
	}

	let cancelButton: HTMLButtonElement;
	const { closeModal, projectId }: Props = $props();
	const projectsRepository = getProjectsRepository();

	function handleClick() {
		projectsRepository.deleteProject(projectId);
		closeModal();
	}

	onMount(() => {
		cancelButton.focus();
	});
</script>

<Modal {closeModal}>
	<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
		<p>Delete project?</p>
		<p>This action is irreversible.</p>
		<div class="flex flex-row justify-end gap-2">
			<button bind:this={cancelButton} class="common-button" onclick={closeModal}> Cancel </button>
			<button class="rounded bg-red-500 p-2 hover:bg-red-600" onclick={handleClick}>
				Delete
			</button>
		</div>
	</div>
</Modal>
