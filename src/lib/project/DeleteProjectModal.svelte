<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import { getProjectsRepositoryContext } from './projectsRepositoryContext';

	interface Props {
		closeModal: () => void;
		projectId: string;
	}

	let cancelButton: HTMLButtonElement;
	const { closeModal, projectId }: Props = $props();
	const projectsRepositoryContext = getProjectsRepositoryContext();

	function handleClick() {
		const { projectsRepository } = projectsRepositoryContext;
		projectsRepository?.deleteProject(projectId);
	}

	onMount(() => {
		cancelButton.focus();
	});
</script>

<Modal {closeModal}>
	<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2">
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
