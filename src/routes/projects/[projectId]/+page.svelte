<script lang="ts">
	import { LocalProjectsRepository } from '$lib/project/LocalProjectsRepository';
	import type { ProjectData } from '$lib/project/ProjectData';
	import ProjectPage from '$lib/project/ProjectPage.svelte';
	import type { ProjectsRepository } from '$lib/project/ProjectsRepository';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	const projectsRepository: ProjectsRepository = new LocalProjectsRepository();

	let projectData = $state<ProjectData>();

	onMount(() => {
		projectData = projectsRepository.getProject(data.projectId);
	});
</script>

{#if projectData}
	<ProjectPage {projectData} />
{/if}
