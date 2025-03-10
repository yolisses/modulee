<script lang="ts">
	import { goto } from '$app/navigation';
	import { createId } from '$lib/data/createId';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getProjectsRepository } from './getProjectsRepository';
	import type { ProjectData } from './ProjectData';

	let isLoading = $state(false);
	const projectsRepository = getProjectsRepository();

	async function handleClick() {
		isLoading = true;
		const mainInternalModuleId = createId();
		const projectData: ProjectData = {
			id: createId(),
			name: 'New project',
			graphData: {
				nodes: [],
				connections: [],
				mainInternalModuleId,
				externalModuleReferences: [],
				internalModules: [{ id: mainInternalModuleId, name: 'Main internalModule' }],
			},
		};
		await projectsRepository.createProject(projectData);
		goto('/projects/' + projectData.id);
	}
</script>

<button disabled={isLoading} onclick={handleClick} class="primary-button">
	<Fa icon={faPlus} />
	Create project
</button>
