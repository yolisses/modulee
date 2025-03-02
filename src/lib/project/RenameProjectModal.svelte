<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import type { ProjectData } from './ProjectData';
	import { getProjectsRepositoryContext } from './projectsRepositoryContext';

	interface Props {
		closeModal: () => void;
		projectData: ProjectData;
	}

	const { closeModal, projectData }: Props = $props();
	let name = $state(projectData.name);
	let textInput: HTMLInputElement;
	const projectsRepositoryContext = getProjectsRepositoryContext();

	function handleSubmit() {
		const { projectsRepository } = projectsRepositoryContext;
		projectsRepository?.renameProject(projectData.id, name);
		closeModal();
	}

	onMount(() => {
		textInput.focus();
	});
</script>

<Modal {closeModal}>
	<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2">
		<p>Rename project "{projectData?.name}"</p>
		<input
			type="text"
			bind:this={textInput}
			bind:value={name}
			onchange={handleSubmit}
			class="rounded border border-white/20 bg-transparent p-2"
		/>
		<div class="flex flex-row justify-end gap-2">
			<button class="common-button" onclick={closeModal}> Cancel </button>
			<button class="rounded bg-blue-500 p-2 hover:bg-blue-600" onclick={handleSubmit}>
				Rename
			</button>
		</div>
	</div>
</Modal>
