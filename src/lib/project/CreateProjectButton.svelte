<script lang="ts">
	import { goto } from '$app/navigation';
	import { createId } from '$lib/data/createId';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from './ProjectData';
	import { getProjectsRepositoryContext } from './projectsRepositoryContext';

	let isLoading = $state(false);
	const projectsRepositoryContext = getProjectsRepositoryContext();

	async function handleClick() {
		isLoading = true;
		const projectData: ProjectData = {
			commands: [],
			id: createId(),
			name: 'New project',
			// TODO consider using the same name than the project
			mainGroup: {
				id: createId(),
				name: 'Main group',
			},
		};
		await projectsRepositoryContext.projectsRepository?.createProject(projectData);
		goto('/projects/' + projectData.id);
	}
</script>

<button
	disabled={isLoading}
	class="rounded bg-blue-500 p-2 hover:bg-blue-600"
	onclick={handleClick}
>
	<Fa icon={faPlus} />
	Create project
</button>
