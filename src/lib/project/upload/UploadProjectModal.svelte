<script lang="ts">
	import { createId } from '$lib/data/createId';
	import Modal from '$lib/ui/Modal.svelte';
	import type { InputChangeEvent } from '$lib/utils/InputChangeEvent';
	import { getProjectsRepository } from '../getProjectsRepository';
	import type { ProjectData } from '../ProjectData';

	interface Props {
		closeModal: () => void;
	}

	let errorText = $state<string>();
	const { closeModal }: Props = $props();

	function getProjectData(content: string) {
		try {
			const projectData: ProjectData = JSON.parse(content);
			projectData.id = createId();
			return projectData;
		} catch (error) {
			errorText = 'Invalid file';
			throw error;
		}
	}

	function handleFileLoad(e: ProgressEvent<FileReader>) {
		const content = e.target?.result as string;
		const projectData = getProjectData(content);
		const projectsRepository = getProjectsRepository();
		projectsRepository?.createProject(projectData);
		closeModal();
	}

	function handleChange(e: InputChangeEvent) {
		const { files } = e.currentTarget;
		if (!files) return;
		if (!files.length) return;

		const reader = new FileReader();
		reader.onload = handleFileLoad;
		reader.onerror = () => {
			errorText = 'Error reading file.';
		};

		const file = files[0];
		reader.readAsText(file);
	}
</script>

<Modal {closeModal}>
	<div class="flex flex-col gap-2 rounded bg-zinc-800 p-2 shadow-xl shadow-black/50">
		<p>Upload project</p>
		<input type="file" class="common-input" onchange={handleChange} accept=".modulee" />
		<div class="text-red-500">{errorText}</div>
	</div>
</Modal>
