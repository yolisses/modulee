<script lang="ts">
	import { goto } from '$app/navigation';
	import { createId } from '$lib/data/createId';
	import Modal from '$lib/ui/Modal.svelte';
	import { onMount } from 'svelte';
	import type { ProjectData } from './ProjectData';
	import { getProjectsRepository } from './getProjectsRepository';

	interface Props {
		closeModal: () => void;
	}

	let name = $state('');
	let isLoading = $state(false);
	let textInput: HTMLInputElement;
	const { closeModal }: Props = $props();
	const projectsRepository = getProjectsRepository();

	async function handleSubmit() {
		isLoading = true;
		const mainInternalModuleId = createId();
		const projectData: ProjectData = {
			name,
			id: createId(),
			moduleType: 'utility',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			graph: {
				nodes: [],
				connections: [],
				mainInternalModuleId,
				externalModuleReferences: [],
				internalModules: [{ id: mainInternalModuleId, name: 'Main internal module' }],
			},
		};
		await projectsRepository.createProject(projectData);
		goto(
			'/projects/' +
				projectData.id +
				'/internalModules/' +
				projectData.graph.mainInternalModuleId +
				'/nodes',
		);
	}

	onMount(() => {
		textInput.focus();
	});
</script>

<Modal {closeModal}>
	<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
		<p>Create project</p>
		<label>
			<div>Name</div>
			<input
				type="text"
				bind:value={name}
				class="common-input"
				bind:this={textInput}
				onchange={handleSubmit}
			/>
		</label>
		<div class="flex flex-row justify-end gap-2">
			<button class="common-button" onclick={closeModal} disabled={isLoading}> Cancel </button>
			<button class="primary-button" onclick={handleSubmit} disabled={isLoading}> Create </button>
		</div>
	</div>
</Modal>
