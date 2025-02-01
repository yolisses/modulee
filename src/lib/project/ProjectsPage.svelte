<script lang="ts">
	import TextSearchInput from '$lib/ui/TextSearchInput.svelte';
	import { onMount } from 'svelte';
	import CreateProjectButton from './CreateProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectList from './ProjectList.svelte';
	import type { ProjectsRepository } from './ProjectsRepository';
	import { setProjectsRepositoryContext } from './projectRepositoryContext';

	interface Props {
		projectsRepository: ProjectsRepository;
	}

	const { projectsRepository }: Props = $props();

	let projectsData = $state<ProjectData[]>([]);

	setProjectsRepositoryContext(projectsRepository);

	onMount(async () => {
		await projectsRepository.initialize();
		projectsData = await projectsRepository.getProjects();
	});
</script>

<div class="flex flex-row items-center justify-between gap-2 border-b border-black">
	<h1 class="pl-2 text-lg font-medium">Projects</h1>
	<div class="flex-1"></div>
	<CreateProjectButton {projectsRepository} />
	<TextSearchInput />
</div>
<ProjectList {projectsData} />
