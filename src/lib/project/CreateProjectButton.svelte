<script lang="ts">
	import { createId } from '$lib/utils/createId';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from './ProjectData';
	import type { ProjectsRepository } from './ProjectsRepository';

	interface Props {
		projectsRepository: ProjectsRepository;
	}

	const { projectsRepository }: Props = $props();

	function handleClick() {
		const projectData: ProjectData = {
			commands: [],
			id: createId(),
			name: 'New project',
		};
		projectsRepository.createProject(projectData);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faPlus} />
	Create project
</button>
