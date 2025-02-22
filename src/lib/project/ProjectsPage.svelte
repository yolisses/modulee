<script lang="ts">
	import TextSearchInput from '$lib/ui/TextSearchInput.svelte';
	import CreateProjectButton from './CreateProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectList from './ProjectList.svelte';
	import type { ProjectsRepository } from './ProjectsRepository';
	import { getProjectsRepositoryContext } from './projectsRepositoryContext';

	let projectsData = $state<ProjectData[]>([]);
	const projectsRepositoryContext = getProjectsRepositoryContext();

	function updateProjects(projectsRepository: ProjectsRepository) {
		projectsRepository.getProjects().then((data) => {
			projectsData = data;
		});
	}

	$effect(() => {
		const { projectsRepository } = projectsRepositoryContext;
		if (!projectsRepository) return;
		if (!projectsRepository.getIsInitialized()) return;
		updateProjects(projectsRepository);
		projectsRepository.onProjectsChange = () => {
			updateProjects(projectsRepository);
		};
	});
</script>

<div class="flex flex-row items-center justify-between gap-2 border-b border-black">
	<h1 class="pl-2 text-lg font-medium">Projects</h1>
	<div class="flex-1"></div>
	<CreateProjectButton />
	<TextSearchInput />
</div>
<ProjectList {projectsData} />
