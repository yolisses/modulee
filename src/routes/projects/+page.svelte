<script lang="ts">
	import { LocalProjectsRepository } from '$lib/project/LocalProjectsRepository';
	import ProjectsPage from '$lib/project/ProjectsPage.svelte';
	import type { ProjectsRepository } from '$lib/project/ProjectsRepository';

	const projectsRepository: ProjectsRepository = new LocalProjectsRepository();
</script>

<ProjectsPage {projectsRepository} />
