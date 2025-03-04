<script lang="ts">
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

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xl flex-col gap-4 p-4">
		<div class="flex flex-row items-center justify-between gap-2">
			<h1 class="pl-2 text-lg font-medium">Projects</h1>
			<div class="flex-1"></div>
			<CreateProjectButton />
		</div>
		<div>
			<ProjectList {projectsData} />
		</div>
	</div>
</div>
