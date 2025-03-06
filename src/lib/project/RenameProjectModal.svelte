<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import { getProjectsRepository } from './getProjectsRepository';
	import type { ProjectData } from './ProjectData';

	interface Props {
		closeModal: () => void;
		projectData: ProjectData;
	}

	const { closeModal, projectData }: Props = $props();
	let name = $state(projectData.name);
	let textInput: HTMLInputElement;

	function handleSubmit() {
		const projectsRepository = getProjectsRepository();
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
			bind:value={name}
			class="common-input"
			bind:this={textInput}
			onchange={handleSubmit}
		/>
		<div class="flex flex-row justify-end gap-2">
			<button class="common-button" onclick={closeModal}> Cancel </button>
			<button class="primary-button" onclick={handleSubmit}> Rename </button>
		</div>
	</div>
</Modal>
